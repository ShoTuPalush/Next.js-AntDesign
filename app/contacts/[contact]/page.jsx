'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact({ params }) {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { data, isSuccess, status } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:3001/api/contacts/${params.contact}`
      );
      return result.data;
    },
    refetchOnMount: 'always',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const { mutate: edit } = useMutation({
    mutationFn: async data => {
      const res = await axios.put(
        `http://localhost:3001/api/contacts/${params.contact}`,
        data
      );
      return res.data;
    },
    onSuccess: newCl => {
      queryClient.setQueriesData(['contacts'], oldC => {
        const nArr = oldC.filter(item => item._id !== params.contact);
        return [...nArr, newCl];
      });
    },
  });

  return (
    <>
      <p>{status}</p>
      {isSuccess && (
        <form className="mb-10" onSubmit={handleSubmit(edit)}>
          <label>
            name
            <input
              defaultValue={data.name}
              name="name"
              type="text"
              {...register('name')}
            />
          </label>
          <label>
            email
            <input
              defaultValue={data.email}
              name="email"
              type="text"
              {...register('email')}
            />
          </label>
          <label>
            phone
            <input
              defaultValue={data.phone}
              name="phone"
              type="text"
              {...register('phone')}
            />
          </label>
          <button>edit</button>
        </form>
      )}
    </>
  );
}
