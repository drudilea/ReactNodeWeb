import React from 'react';
import { Image, Table } from 'antd';

const PhotosTable = ({ data, loading, pagination, onChange }) => {
  pagination.position = ['bottomCenter'];

  const columns = [
    {
      title: '',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: 'AlbumId',
      dataIndex: 'albumId',
      key: 'albumId',
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
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={onChange}
    />
  );
};
export default PhotosTable;
