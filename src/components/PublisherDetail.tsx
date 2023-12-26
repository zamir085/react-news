import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublisher } from '../services/publishersApi';
import { getNewsByPublisher } from '../services/newsApi';
import { Box, Typography, Avatar } from '@mui/material';

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
    <div>
      {publisherData && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Avatar alt={publisherData.username} src={publisherData.profileImg} />
          <Typography variant="h6">{publisherData.username}</Typography>
          <Typography variant="subtitle1">Name: {publisherData.name}</Typography>
          <Typography variant="subtitle1">Email: {publisherData.email}</Typography>
          <Typography variant="subtitle1">Joined Date: {publisherData.joinedDate}</Typography>
          <Typography variant="body1">Description: {publisherData.description}</Typography>
        </Box>
      )}

      <Box>
        {publisherNews.map((news) => (
          <div key={news._id}>
            <Typography variant="h6">{news.title}</Typography>
            <Typography variant="subtitle2">{news.createdAt}</Typography>
            <img src={news.thumbnailImg} alt={news.title} style={{ width: '100px', height: '100px' }} />
            <Typography variant="body2" dangerouslySetInnerHTML={{ __html: news?.newsBody || '' }}/>
            <a href={news.linkURL} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default PublisherDetail;
