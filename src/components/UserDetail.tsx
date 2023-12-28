import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Modal, Input, Button, Avatar, notification, Image } from 'antd';
import { updateUser, getUser, getAllUsers } from '../services/usersApi';

const UserDetail = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    _id: '',
    username: '',
    fullName: '',
    profileImg: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
    setUserId(userFromLocalStorage.id);
    getUser(userFromLocalStorage.id).then((data) => {
      setUserData(data);
    });

    getAllUsers().then((users) => {
      setExistingUsers(users);
    });
  }, [userData]);

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

    updateUser(userId, { password: values.newPassword });
    setVisiblePassword(false);
  };

  const handleUpdateInfo = async (values) => {
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
  
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
        userFromLocalStorage.username = values.username;
        localStorage.setItem('user', JSON.stringify(userFromLocalStorage));
      }
  
      await updateUser(userId, values);
      setVisibleInfo(false);
    }
  };
  
  

  const validationSchemaPassword = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm password is required'),
  });

  const validationSchemaInfo = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    fullName: Yup.string().required('Full name is required'),
    profileImg: Yup.string().url('Invalid URL format').required('Profile image is required'),
  });

  const handleEditPassword = () => {
    setVisiblePassword(true);
  };

  const handleEditInfo = () => {
    setVisibleInfo(true);
  };

  return (
    <div>
      <h1>User Detail</h1>
      <Image width={64} src={userData.profileImg} ></Image>
      <p>Username: {userData.username}</p>
      <p>Full Name: {userData.fullName}</p>
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
                <label>Full Name:</label>
                <Field name="fullName" as={Input} />
                {errors.fullName && touched.fullName && (
                  <div>{errors.fullName}</div>
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
    </div>
  );
};

export default UserDetail;
