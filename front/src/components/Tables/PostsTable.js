import React from 'react';
import { Table } from 'antd';

const PostsTable = ({ data, loading }) => {
  const pagination = {
    position: ['bottomCenter'],
    // current: 1,
    // pageSize: 200,
  };

  const columns = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
    />
  );
};
export default PostsTable;
