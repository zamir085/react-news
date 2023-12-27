import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublisher } from '../services/publishersApi';
import { getNewsByPublisher } from '../services/newsApi';
import { Avatar, Typography, Row, Col, Card } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

type PublisherDetailParams = {
  id: string;
};

interface PublisherType {
  _id: string;
  name: string;
  username: string;
  profileImg: string;
  joinedDate: string;
  description: string;
  email: string;
}

interface NewsType {
  _id: string;
  createdAt: string;
  linkURL: string;
  newsBody: string;
  thumbnailImg: string;
  title: string;
}

const PublisherDetail: React.FC = () => {
  const { id } = useParams<PublisherDetailParams>();
  const index = id || '';
  const [publisherData, setPublisherData] = useState<PublisherType | null>(null);
  const [publisherNews, setPublisherNews] = useState<NewsType[]>([]);

  useEffect(() => {
    const fetchPublisher = async () => {
      try {
        const publisher = await getPublisher(index);
        setPublisherData(publisher);

        const news = await getNewsByPublisher(index);
        setPublisherNews(news);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPublisher();
  }, [index]);

  return (
    <div >
    {publisherData && (
  <Row gutter={[16, 16]} style={{ margin: '40px 0 0 0' }} justify="center" align="middle">
    <Col xs={24} sm={12} md={12} style={{ textAlign: 'center' }}>
      <Avatar size={300} src={publisherData.profileImg} />
      <div>
        <Typography.Title level={4}>{publisherData.username}</Typography.Title>
        <Typography.Paragraph>Name: {publisherData.name}</Typography.Paragraph>
        <Typography.Paragraph>Email: {publisherData.email}</Typography.Paragraph>
        <Typography.Paragraph>
          Joined Date: {publisherData.joinedDate}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Description: {publisherData.description}
        </Typography.Paragraph>
      </div>
    </Col>
  </Row>
)}



      <Row gutter={[16, 16]} style={{padding:'40px 25px'}}>
        {publisherNews.map((news) => (
          <Col xs={24} sm={12} md={8} key={news._id}>
            <Card hoverable cover={<img alt={news.title} src={news.thumbnailImg} />}>
              <Meta title={news.title} />
              <div dangerouslySetInnerHTML={{ __html: news?.newsBody || '' }} />
              <div style={{ marginTop: '12px' }}>
                <ClockCircleOutlined />
                <span style={{ marginLeft: '8px' }}>{news.createdAt}</span>
              </div>
              <Link to={`/news/${news._id}`}>Read More</Link>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
};

export default PublisherDetail;
