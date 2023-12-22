import { useState } from 'react';
import { Layout, Form, Input, Button, message, Col, Row } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import Logo from '../../public/ico.png';
import { Link } from 'react-router-dom';
import { FormikHelpers } from 'formik';

const { Footer: AntFooter } = Layout;

const YOUR_SERVICE_ID =  'service_azbb3j8';
const YOUR_TEMPLATE_ID = 'template_x7z11vh';
const YOUR_USER_ID =  't26SHU1Asv3xnr6hn';

const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    message: Yup.string().required(),
  });

  const initialValues: FormType = {
    email: '',
    message: '',
  };

  interface FormType {
    email: string;
    message: string;
    [key: string]: string; 
  }

  const onSubmit = (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
    setIsSubmitting(true);
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, values, YOUR_USER_ID)
      .then((response) => {
        message.success('Your Message successfully sent!');
        resetForm();
        console.log(response);
      })
      .catch((error) => {
        message.error('Try again.');
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <AntFooter style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={24} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',gap:'20px' }}>
         <Link to={'/'}> <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} /></Link>
          <p>
            <b>&copy; {new Date().getFullYear()} <i>Guliyev Zamir News</i></b>
          </p>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form style={{ width: '100%' }} onFinish={formik.handleSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  validateStatus={formik.errors.email && formik.touched.email ? 'error' : ''}
                  help={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                >
                  <Input
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Message"
                  name="message"
                  validateStatus={formik.errors.message && formik.touched.message ? 'error' : ''}
                  help={formik.errors.message && formik.touched.message ? formik.errors.message : null}
                >
                  <Input.TextArea
                    placeholder="Message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                    Send
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
