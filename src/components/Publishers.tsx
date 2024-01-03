import { Table, Avatar, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllPublishers } from '../services/publishersApi';

interface Publisher {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  joinedDate: string;
  description: string;
}

const Publishers: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    const fetchPublishers = async () => { 
      try {
        const data: Publisher[] = await getAllPublishers();
        setPublishers(data);
      } catch (error) {
        console.error('Error fetching publishers: ', error);
      }
    };

    fetchPublishers();
  }, []);

  const columns = [
    {
      title: 'Profile Image',
      dataIndex: 'profileImg',
      key: 'profileImg',
      render: (text: string) => <Avatar src={text} size={50} shape="circle" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Publisher) => (
        <Space size="middle">
          <Link to={`/publisher/${record._id}`}>{text}</Link>
        </Space>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
      render: (date: Date) => new Date(date).toDateString(),
    },
  ];

  return (
    <div>
      <h1 style={{margin:'30px 0',textAlign:'center'}}>Publishers</h1>
      <Table<Publisher> dataSource={publishers} columns={columns} />
    </div>
  );
};

export default Publishers;
