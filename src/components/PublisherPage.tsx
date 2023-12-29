import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Input, Button,  notification, Image, Row, Col, Card } from 'antd';
import { updatePublisher, getPublisher, getAllPublishers } from '../services/publishersApi';
import { getNewsByPublisher } from '../services/newsApi';
import { Link } from 'react-router-dom';
const { Meta } = Card;
import { ClockCircleOutlined } from '@ant-design/icons';

interface NewsType {
  _id: string;
  createdAt: string;
  linkURL: string;
  newsBody: string;
  thumbnailImg: string;
  title: string;
}


const PublisherPage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    _id: '',
    username: '',
    name: '',
    profileImg: '',
    email: '',
    password: '',
    description:''
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);
  const [publisherNews, setPublisherNews] = useState<NewsType[]>([]);

  const userLocale = JSON.parse(localStorage.getItem('publisher') || '{}');

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('publisher') || '{}');
    setUserId(userFromLocalStorage.id);
    getPublisher(userFromLocalStorage.id).then((data) => {
      setUserData(data);
    });

    getAllPublishers().then((users) => {
      setExistingUsers(users);
    });
    
    

  }, []);

  useEffect(()=>{
    getNewsByPublisher(userLocale.id).then((news)=>{
      setPublisherNews(news);
     });
  },[])

  console.log(publisherNews)

  const handleUpdatePassword = (values) => {
    if (values.currentPassword !== userData.password) {
      notification.error({
        message: 'Error',
        description: 'Current password is incorrect!',
      });
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      notification.error({
        message: 'Error',
        description: 'New password and confirm password do not match!',
      });
      return;
    }

    updatePublisher(userId, { password: values.newPassword });
    setVisiblePassword(false);
  };

  const handleUpdateInfo = async (values) => {
    try {
      const isUsernameExists = existingUsers.some(user => user.username === values.username);
  
      if (isUsernameExists && userData.username !== values.username) {
        notification.warning({
          message: 'Warning',
          description: 'This username already exists!',
        });
      } else {
        if (userData.username !== values.username) {
          const updatedUsers = existingUsers.filter(user => user.username !== userData.username);
          setExistingUsers(updatedUsers);
  
          const userFromLocalStorage = JSON.parse(localStorage.getItem('publisher') || '{}');
          userFromLocalStorage.username = values.username;
          localStorage.setItem('publisher', JSON.stringify(userFromLocalStorage));
        }
  
        await updatePublisher(userId, values);
        setVisibleInfo(false);
  
        if (userData.username !== values.username) {
          setUserData(prevUserData => ({
            ...prevUserData,
            username: values.username,
            name: values.name,
            description: values.description,
            profileImg: values.profileImg,
          }));
        }
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Failed to update user information!',
      });
    }
  };
  
  
  

  const validationSchemaPassword = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm password is required'),
  });

  const validationSchemaInfo = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Full name is required'),
    profileImg: Yup.string().url('Invalid URL format').required('Profile image is required'),
    description: Yup.string().required('Profile image is required'),
  });

  const handleEditPassword = () => {
    setVisiblePassword(true);
  };

  const handleEditInfo = () => {
    setVisibleInfo(true);
  };

  return (
    <div>
      <h1>Publisher Detail</h1>
      <Image width={64} src={userData.profileImg} ></Image>
      <p>Username: {userData.username}</p>
      <p>Full Name: {userData.name}</p>
      <p>Desc: {userData.description}</p>
      <p>Email: {userData.email}</p>

      <Button onClick={handleEditPassword}>Edit Password</Button>
      <Modal
        title="Edit Password"
        visible={visiblePassword}
        onCancel={() => setVisiblePassword(false)}
        footer={null}
      >
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchemaPassword}
          onSubmit={handleUpdatePassword}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <label>Current Password:</label>
                <Field name="currentPassword" type="password" as={Input} />
                {errors.currentPassword && touched.currentPassword && (
                  <div>{errors.currentPassword}</div>
                )}
              </div>
              <div>
                <label>New Password:</label>
                <Field name="newPassword" type="password" as={Input} />
                {errors.newPassword && touched.newPassword && (
                  <div>{errors.newPassword}</div>
                )}
              </div>
              <div>
                <label>Confirm Password:</label>
                <Field name="confirmPassword" type="password" as={Input} />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div>{errors.confirmPassword}</div>
                )}
              </div>
              <Button type="primary" htmlType="submit">
                Update Password
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Button onClick={handleEditInfo}>Edit Info</Button>
      <Modal
        title="Edit Info"
        visible={visibleInfo}
        onCancel={() => setVisibleInfo(false)}
        footer={null}
      >
        <Formik
          initialValues={userData}
          validationSchema={validationSchemaInfo}
          onSubmit={handleUpdateInfo}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div>
                <label>Username:</label>
                <Field name="username" as={Input} />
                {errors.username && touched.username && (
                  <div>{errors.username}</div>
                )}
              </div>
              <div>
                <label>Name:</label>
                <Field name="name" as={Input} />
                {errors.name && touched.name && (
                  <div>{errors.name}</div>
                )}
              </div>
              <div>
                <label>Desciption:</label>
                <Field name="description" as={Input} />
                {errors.description && touched.description && (
                  <div>{errors.description}</div>
                )}
              </div>
              <div>
                <label>Profile Image:</label>
                <Field name="profileImg" as={Input} />
                {errors.profileImg && touched.profileImg && (
                  <div>{errors.profileImg}</div>
                )}
              </div>
              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                Update Info
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
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

export default PublisherPage;
