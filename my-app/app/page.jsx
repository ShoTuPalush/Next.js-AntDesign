'use client';

import { Layout, Menu, Typography, Button, Flex } from 'antd';
import { MehTwoTone } from '@ant-design/icons';
import { useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;
const { Link, Text } = Typography;

export default function Home() {
  const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laboriosam reiciendis placeat hic itaque. Harum molestias aspernatur vero, eum aperiam blanditiis quia est perferendis quam nostrum, dolorum illum sequi consequatur?';
  const [editText, setEditText] = useState(lorem);
  return (
    <>
      <Layout>
        <Header className="flex items-center bg-gray-200 mb-10">
          <MehTwoTone className="text-3xl mr-3" />
          <Link href="/" className=" mr-4">
            NameSite
          </Link>
          <Menu
            items={[
              { key: 1, label: 'home' },
              { key: 2, label: 'about' },
              { key: 3, label: 'list' },
              { key: 4, label: 'contact' },
            ]}
            defaultSelectedKeys={['1']}
            mode="horizontal"
            className="bg-inherit flex-1"
          />
          <Text>User</Text>
        </Header>
        <Content className="px-12">
          <Layout className="bg-white py-6 rounded-3xl">
            <Sider className="bg-white" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                className="h-full"
                items={[
                  { key: 1, label: 'user' },
                  { key: 2, label: 'friends' },
                  { key: 3, label: 'setings' },
                ]}
              />
            </Sider>
            <Content className="px-6 min-h-[280px]">
              <Flex vertical align="flex-end" justify="space-between">
                <Text className="flex-1" editable={{ onChange: setEditText }}>
                  {editText}
                </Text>
                <Button onClick={() => setEditText('')}>Clear</Button>
              </Flex>
            </Content>
          </Layout>
        </Content>
        <Footer className="text-center">
          demo design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </>
  );
}

// style={{ fontSize: '32px' }}
