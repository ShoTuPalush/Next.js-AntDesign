'use client';

import { DeleteOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Avatar, Card, Checkbox, Flex, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const { Text } = Typography;

async function fetchTodos() {
  const res = await axios.get('http://localhost:3001/api/contacts');
  return res.data;
}

const todoListOptions = queryOptions({
  queryKey: ['contacts'],
  staleTime: 1000 * 5,
  queryFn: fetchTodos,
});

export default function Contacts() {
  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery(todoListOptions);

  const { mutate: favorite } = useMutation({
    mutationFn: async ({ id, cred }) => {
      await axios.patch(`http://localhost:3001/api/contacts/${id}/favorite`, {
        favorite: cred,
      });
    },
    onSuccess: newCl => {
      queryClient.setQueriesData(['contacts'], oldC => [...oldC]);
    },
  });

  const { mutate: deletes } = useMutation({
    mutationFn: async id => {
      const res = await axios.delete(
        `http://localhost:3001/api/contacts/${id}`
      );
      return res.data;
    },
    onSuccess: newCl => {
      console.log(newCl._id);
      const id = newCl._id;
      queryClient.setQueriesData(['contacts'], oldC =>
        oldC.filter(item => item._id !== id)
      );
    },
  });

  const add = useMutation({
    mutationFn: async data => {
      const res = await axios.post(`http://localhost:3001/api/contacts/`, {
        ...data,
        favorite: false,
      });
      return res.data;
    },
    onSuccess: newCl => {
      queryClient.setQueriesData(['contacts'], oldC => [...oldC, newCl]);
    },
    // onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
  });

  const { register, handleSubmit } = useForm();

  return (
    <>
      <form className="mb-10" onSubmit={handleSubmit(add.mutate)}>
        <label>
          name
          <input name="name" type="text" {...register('name')} />
        </label>
        <label>
          email
          <input name="email" type="text" {...register('email')} />
        </label>
        <label>
          phone
          <input name="phone" type="text" {...register('phone')} />
        </label>
        <button>add</button>
      </form>
      <div className="flex justify-center">
        <Flex wrap="wrap" gap={24} className="max-w-[1200px]">
          {isSuccess &&
            data.map(item => (
              <Card
                key={item._id}
                hoverable
                style={{ width: 240 }}
                cover={
                  <Avatar
                    className="ml-auto mr-auto mt-4"
                    size={64}
                    icon={<UserOutlined />}
                  />
                }
                actions={[
                  <Checkbox
                    defaultChecked={item?.favorite || false}
                    icon={<HeartOutlined />}
                    onChange={evt =>
                      favorite({ id: item._id, cred: !item.favorite })
                    }
                  />,
                  <DeleteOutlined
                    onClick={() => {
                      deletes(item._id);
                    }}
                    key="delete"
                  />,
                ]}
              >
                <Flex justify="center" wrap="wrap" gap={4}>
                  <Text strong className="text-xl">
                    {item.name}
                  </Text>
                  <Text italic>{item.email}</Text>
                  <Text className="text-xl">{item.phone}</Text>
                </Flex>
              </Card>
            ))}
        </Flex>
      </div>
    </>
  );
}
