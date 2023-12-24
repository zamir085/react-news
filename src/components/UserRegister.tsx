import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { getAllUsers, postUser } from "../services/usersApi";
import { useNavigate } from "react-router-dom";

interface UserRegisterProps {}

interface UserValues {
  username: string;
  fullName: string;
  profileImg: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserRegister: React.FC<UserRegisterProps> = () => {
  const navigate = useNavigate();

  const initialValues: UserValues = {
    username: "",
    fullName: "",
    profileImg: "",
    email: "",
    password: "",
    isAdmin: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Full name is required"),
    profileImg: Yup.string()
      .url("Invalid URL format")
      .required("Profile image is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(8),
    isAdmin: Yup.boolean(),
  });

  const handleSubmit = async (
    values: UserValues,
    { resetForm }: FormikHelpers<UserValues>
  ) => {
    try {
      const users = await getAllUsers();
      const existingUser = users.find(
        (user: UserValues) => user.username === values.username
      );

      if (existingUser) {
        alert("This username already exists!");
      } else {
        await postUser(values);
        resetForm();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid, values, setFieldValue }) => (
        <Form>
          <Box
            style={{ margin: "20px" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Field
                name="username"
                as={TextField}
                label="Username"
                error={!!(errors.username && touched.username)}
                helperText={touched.username ? errors.username : ""}
                sx={{ marginBottom: "8px", width: "100%" }}
              />
              <Field
                name="fullName"
                as={TextField}
                label="Full Name"
                error={!!(errors.fullName && touched.fullName)}
                helperText={touched.fullName ? errors.fullName : ""}
                sx={{ marginBottom: "8px", width: "100%" }}
              />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <Field
                name="email"
                as={TextField}
                type="email"
                label="Email"
                error={!!(errors.email && touched.email)}
                helperText={touched.email ? errors.email : ""}
                sx={{ marginBottom: "8px", width: "100%" }}
              />
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                error={!!(errors.password && touched.password)}
                helperText={touched.password ? errors.password : ""}
                sx={{ marginBottom: "8px", width: "100%" }}
              />
            </div>
            <Field
              name="profileImg"
              as={TextField}
              label="Profile Image"
              error={!!(errors.profileImg && touched.profileImg)}
              helperText={touched.profileImg ? errors.profileImg : ""}
              sx={{ marginBottom: "8px", width: "100%" }}
            />
            <Field name="isAdmin" as={Checkbox}>
              {({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={values.isAdmin}
                      onChange={() => setFieldValue("isAdmin", !values.isAdmin)}
                    />
                  }
                  label="Is Admin"
                />
              )}
            </Field>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserRegister;
