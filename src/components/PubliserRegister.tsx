import { TextField, Button, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

interface PublisherRegisterProps {}

interface PublisherValues {
  id: string;
  username: string;
  password: string;
  email: string;
  backgroundImg: string;
  profileImg: string;
  name: string;
  description: string;
  joinedDate: string;
}

const PublisherRegister: React.FC<PublisherRegisterProps> = () => {
  const initialValues: PublisherValues = {
    id: '',
    username: '',
    password: '',
    email: '',
    backgroundImg: '',
    profileImg: '',
    name: '',
    description: '',
    joinedDate: new Date().toISOString().split('T')[0], 
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    backgroundImg: Yup.string().required('Background image is required'),
    profileImg: Yup.string().required('Profile image is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = (values: PublisherValues, { resetForm }: any) => {
    const id = uuidv4(); 
    const dataWithId = { ...values, id, joinedDate: new Date().toISOString().split('T')[0] };
    console.log(dataWithId);
    resetForm(); 
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid }) => (
        <Form>
          <Box>
            <Field name="username" as={TextField} label="Username" error={errors.username && touched.username} helperText={errors.username} />
            <Field name="password" as={TextField} type="password" label="Password" error={errors.password && touched.password} helperText={errors.password} />
            <Field name="email" as={TextField} type="email" label="Email" error={errors.email && touched.email} helperText={errors.email} />
            <Field name="backgroundImg" as={TextField} label="Background Image" error={errors.backgroundImg && touched.backgroundImg} helperText={errors.backgroundImg} />
            <Field name="profileImg" as={TextField} label="Profile Image" error={errors.profileImg && touched.profileImg} helperText={errors.profileImg} />
            <Field name="name" as={TextField} label="Name" error={errors.name && touched.name} helperText={errors.name} />
            <Field name="description" as={TextField} multiline rows={4} label="Description" error={errors.description && touched.description} helperText={errors.description} />
            <Field name="joinedDate" type="hidden" />

            <Button type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PublisherRegister;
