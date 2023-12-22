import { TextField, Button, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { FormikHelpers } from 'formik';

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
    username: Yup.string().required(),
    password: Yup.string().required('Password is required').min(8),
    email: Yup.string().email().required(),
    backgroundImg: Yup.string().url().required(),
    profileImg: Yup.string().url().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
  });

  const handleSubmit = (values: PublisherValues, { resetForm }: FormikHelpers<PublisherValues>) => {
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
          <Box display="flex" flexDirection="column">
            <Box style={{ margin: '20px 0' }} display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
              <Field name="username" as={TextField} label="Username" error={!!(errors.username && touched.username)} helperText={touched.username ? errors.username : ''} />
              <Field name="email" as={TextField} type="email" label="Email" error={!!(errors.email && touched.email)} helperText={touched.email ? errors.email : ''} />
            </Box>
            <Box style={{ margin: '20px 0' }} display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
              <Field name="password" as={TextField} type="password" label="Password" error={!!(errors.password && touched.password)} helperText={touched.password ? errors.password : ''} />
              <Field name="name" as={TextField} label="Name" error={!!(errors.name && touched.name)} helperText={touched.name ? errors.name : ''} />
            </Box>
            <Box style={{ margin: '20px 0' }} display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
              <Field name="backgroundImg" as={TextField} label="Background Image" error={!!(errors.backgroundImg && touched.backgroundImg)} helperText={touched.backgroundImg ? errors.backgroundImg : ''} />
              <Field name="profileImg" as={TextField} label="Profile Image" error={!!(errors.profileImg && touched.profileImg)} helperText={touched.profileImg ? errors.profileImg : ''} />
            </Box>
            <Box style={{ margin: '20px 0' }} display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center">
              <Field style={{ width: '250px' }} name="description" as={TextField} multiline rows={2} label="Description" error={!!(errors.description && touched.description)} helperText={touched.description ? errors.description : ''} />
              <Field name="joinedDate" type="hidden" />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>Submit</Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
  
};

export default PublisherRegister;
