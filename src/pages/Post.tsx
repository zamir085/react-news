import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { postNews } from '../services/newsApi';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

interface PostNews {
  title: string;
  linkURL: string;
  thumbnailImg: string;
  newsBody: string;
  author: string;
}

const Post = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()
  const publisherId = JSON.parse(localStorage.getItem('publisher') || '{}');

  const initialValues = {
    title: '',
    linkURL: '',
    thumbnailImg: '',
    newsBody: '',
    author: publisherId.id || '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    linkURL: Yup.string().url('Invalid URL').required('URL is required'),
    thumbnailImg: Yup.string().url('Invalid URL'),
    newsBody: Yup.string().required('News body is required'),
  });

  const handleSubmit = async (
    values: PostNews,
    { setSubmitting, resetForm }: FormikHelpers<PostNews>
  ) => {
    try {
      await postNews(values);
      setSuccess(true);
      resetForm();
      navigate('/')
    } catch (error) {
      setError('Error posting news');
    } finally {
      setSubmitting(false);
    }
  };

  const editorRef = useRef<any>(null);

  return (
    <div className="App" style={{margin:"30px"}}>
        <h2 style={{textAlign:'center',margin:'20px 0'}}>Add new News</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form style={{ maxWidth: '600px', margin: 'auto' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                type="text"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                helperText={<ErrorMessage name="title" />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                type="text"
                name="linkURL"
                label="Link URL"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                helperText={<ErrorMessage name="linkURL" />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                as={TextField}
                type="text"
                name="thumbnailImg"
                label="Thumbnail Image"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                helperText={<ErrorMessage name="thumbnailImg" />}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'none' }}>
                <Field type="hidden" name="createAt" />
              </div>
              <Editor
                onInit={(editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={(content, editor) => {
                  setFieldValue('newsBody', content);
                  console.log(editor)
                }}
              />
              <ErrorMessage name="newsBody" component="div" />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginBottom: '1rem' }}
            >
              Post News
            </Button>
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            {success && (
              <Alert severity="success" onClose={() => setSuccess(false)}>
                News posted successfully!
              </Alert>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Post;
