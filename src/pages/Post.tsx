import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { postNews } from '../services/newsApi';
import { FormikHelpers } from 'formik';

interface PostNews {
    title: string;
    createAt: Date;
    linkURL: string;
    thumbnailImg: string;
    newsBody: string;
    author: string;
}

const Post = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const publisherId = JSON.parse(localStorage.getItem('publisher') || '{}');
    const initialValues = {
        title: '',
        createAt: new Date().toISOString(),
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

    const handleSubmit = async (values: PostNews, { setSubmitting, resetForm }: FormikHelpers<PostNews>) => {
        try {
            console.log(values.createAt)
            await postNews(values,);
            setSuccess(true);
            resetForm();
        } catch (error) {
            setError('Error posting news');
        } finally {
            setSubmitting(false);
        }
    };
    

    const editorRef = useRef<any>(null);



    return (
        <div className="App">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
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
                                onInit={(evt, editor) => (editorRef.current = editor)}
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
                                }}

                            // onEditorChange={(content, editor) => {
                            //     const innerText = editor.getContent({ format: 'text' });
                            //     console.log('Inner Text:', innerText);

                            //   setFieldValue('newsBody', innerText);
                            // }}
                            />
                            <ErrorMessage name="newsBody" component="div" />
                        </div>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
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
