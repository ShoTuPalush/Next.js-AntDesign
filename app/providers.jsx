'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { MehTwoTone } from '@ant-design/icons';
const { Header, Footer } = Layout;
const { Link, Text } = Typography;

export const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header className="flex items-center bg-gray-200 mb-10">
          <MehTwoTone className="text-3xl mr-3" />
          <Link href="/" className=" mr-4">
            NameSite
          </Link>
          <Menu
            items={[
              { key: 1, label: <a href="/">home</a> },
              { key: 2, label: <a href="/contacts">contacts</a> },
              { key: 3, label: 'list' },
            ]}
            defaultSelectedKeys={['1']}
            mode="horizontal"
            className="bg-inherit flex-1"
          />
          <Text>User</Text>
        </Header>
        {children}
        <Footer className="text-center">
          demo design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </QueryClientProvider>
  );
};
