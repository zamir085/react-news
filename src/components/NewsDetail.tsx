import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useNews from '../hooks/news';
import Error from './Home/Error';
import Loading from './Home/Loading';
import { Button, Box, Typography, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getNews } from '../services/newsApi';

type ArticleData = {
  _id: string;
  title: string;
  linkURL: string;
  thumbnailImg: string;
  newsBody: string;
  author: string;
  __v: number;
};

type NewsDetailParams = {
  id: string;
};

const NewsDetail: React.FC = () => {
  const { error: newsError,  loading: newsLoading } = useNews();
  const { id } = useParams<NewsDetailParams>();
  const index = id || '';
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getNews(index);
        setArticleData(article);
      } catch (error) {
        console.log(error)
      }
    };

    fetchArticle();
  }, [index]);

  if (newsLoading) return <Loading />;
  if (newsError) return <Error error={newsError} />;

  return (
    <div style={{ marginBottom: 200, position: 'relative' }}>
      <Box
        component="img"
        sx={{
          height: 500,
          width: '100%',
          maxHeight: { xs: 200, sm: 300, md: 400 },
        }}
        alt={articleData?.title}
        src={articleData?.thumbnailImg}
      />
      <Box
        sx={{
          margin: { md: '4rem', xs: '1rem' },
          backgroundColor: 'white',
          p: { md: '2rem 4rem', xs: '1rem 1.5rem' },
          width: { sm: '90%', md: '80%' },
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mb: '3rem', fontSize: { xs: '1.5rem' } }}
        >
          {articleData?.title}{' '}
        </Typography>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: articleData?.newsBody || '' }} />
        <Typography
          variant="subtitle1"
          sx={{ marginTop: '1rem', fontWeight: 600 }}
        >
          Learn more:{' '}
          <Link href={articleData?.linkURL} underline="hover" color="inherit">
            {articleData?.title}
          </Link>
        </Typography>

        <Button
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
          sx={{ marginTop: '3rem' }}
        >
          Back to homepage
        </Button>
      </Box>
    </div>
  );
};

export default NewsDetail;
