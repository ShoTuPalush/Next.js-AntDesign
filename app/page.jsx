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
            <Flex vertical>
              <Text className="" editable={{ onChange: setEditText }}>
                {editText}
              </Text>
              <Button className="max-w-40" onClick={() => setEditText('')}>
                Clear
              </Button>
            </Flex>
          </Content>
        </Layout>
      </Content>
    </>
  );
}

// style={{ fontSize: '32px' }}
