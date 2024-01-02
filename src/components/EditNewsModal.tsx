import { Form, Input, Button } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';

interface EditNewsModalProps {
  initialValues: {
    title: string;
    linkURL: string;
    thumbnailImg: string;
    newsBody: string;
  };
  onSubmit: (values: {
    title: string;
    linkURL: string;
    thumbnailImg: string;
    newsBody: string;
  }) => void;
  onCancel: () => void;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    linkURL: Yup.string().url('Invalid URL format').required('Link URL is required'),
    thumbnailImg: Yup.string().url('Invalid URL format').required('Thumbnail Image URL is required'),
    newsBody: Yup.string().required('News body is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      enableReinitialize={true}
    >
      {({ errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
        <Form onFinish={handleSubmit}>
          <div>
            <label>Title:</label>
            <Field name="title" as={Input} />
            {errors.title && touched.title && <div>{errors.title}</div>}
          </div>
          <div>
            <label>Link URL:</label>
            <Field name="linkURL" as={Input} />
            {errors.linkURL && touched.linkURL && <div>{errors.linkURL}</div>}
          </div>
          <div>
            <label>Thumbnail Image URL:</label>
            <Field name="thumbnailImg" as={Input} />
            {errors.thumbnailImg && touched.thumbnailImg && <div>{errors.thumbnailImg}</div>}
          </div>
          <div>
            <label>News Body:</label>
            <Editor
              initialValue={initialValues.newsBody}
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
              onEditorChange={(content) => {
                setFieldValue('newsBody', content);
              }}
            />
            {errors.newsBody && touched.newsBody && <div>{errors.newsBody}</div>}
          </div>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Update News
          </Button>
          <Button onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditNewsModal;
