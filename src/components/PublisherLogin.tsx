import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { getAllPublishers } from '../services/publishersApi'; 
import { setUserType } from '../store/slices/userTypeSlice';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

interface FormValues {
  username: string;
  password: string;
}
interface User{
  id:string
  username: string,
  fullName: string,
  profileImg: string,
  email: string,
  password: string,
  isAdmin: boolean,
}

const PublisherLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) =>{
    try {
      const allUsers = await getAllPublishers();
      const foundUser = allUsers.find((user:User) => user.username === values.username && user.password === values.password);
  
      if (foundUser) {
        dispatch(setUserType(foundUser)); 
        localStorage.setItem('publisher', JSON.stringify({ id: foundUser._id, username: foundUser.username }));
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error logging in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{margin:'20px 0'}}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                type="text"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                helperText={<ErrorMessage name="username" />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                helperText={<ErrorMessage name="password" />}
              />
            </div>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default PublisherLogin