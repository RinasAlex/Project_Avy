import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slice/authActions";
import CustomInput from "../../ui/customInput/CustomInput";
import s from "./RegisterForm.module.css";
import RadioBtn from "../../ui/customRadioButton/RadioBtn";
import logo from "../../assets/images/logo.svg";
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = object().shape({
  firstName: string()
    .required("Name is a required field")
    .min(2, "At least 2 characters"),
  email: string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
});

export default function RegisterForm() {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [role, setRole] = useState(); 
  const [touchedFields, setTouchedFields] = useState({});

  // redirect authorized user to login screen
  useEffect(() => {
    if (success) navigate("/login");
  }, [navigate, success]);

  const submitForm = (data) => {
    const newUser = {
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      roleName: "ROLE_USER",
    };
    dispatch(registerUser(newUser));
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleName: "",
      }}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className={s.loginWrapper}>
          <div className={s.form}>
            <form onSubmit={handleSubmit}>
              <img className={s.logo} src={logo} alt="logo" />
              <h2>Hi! Create your account.</h2>
              <div className={s.inputs}>
                <div>
                  <p className={s.names}>Name</p>
                  <CustomInput
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, firstName: true });
                    }}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Enter your name"
                    id="firstName"
                  />
                </div>
                <div>
                  <p className={s.names}>Email</p>
                  <CustomInput
                    type="email"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, email: true });
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter your email"
                    id="email"
                  />
                </div>
                <div>
                  <p className={s.names}>Create password</p>
                  <CustomInput
                    type="password"
                    name="password"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, password: true });
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    id="password"
                  />
                </div>
                <div>
                  <p className={s.names}>Repeat password</p>
                  <CustomInput
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({
                        ...touchedFields,
                        confirmPassword: true,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Confirm password"
                    id="confirmPassword"
                  />
                </div>
              </div>
              <p className={s.error}>
                {(touchedFields.firstName || touched.firstName) &&
                  errors.firstName &&
                  touched.firstName &&
                  errors.firstName}
              </p>
              <p className={s.error}>
                {(touchedFields.email || touched.email) &&
                  errors.email &&
                  touched.email &&
                  errors.email}
              </p>
              <p className={s.error}>
                {(touchedFields.password || touched.password) &&
                  errors.password &&
                  touched.password &&
                  errors.password}
              </p>
              <p className={s.error}>
                {(touchedFields.confirmPassword || touched.confirmPassword) &&
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
              {/* <span className={s.names}>Sign up as:</span> */}
              {/* <div className={s.checkboxWrapper}>
                <RadioBtn
                  value={values.roleName}
                  name={"roleName"}
                  label={"Student"}
                  onChange={() => setRole("ROLE_USER")}
                />
                <RadioBtn
                  value={values.roleName}
                  name={"roleName"}
                  label={"Instructor"}
                  onChange={() => setRole("ROLE_ADMIN")}
                />
              </div> */}
              <p className={s.redirect}>
                Already have an account? 
                <span onClick={() => navigate("/login")}> Login</span>
              </p>
              <button type="submit"> Register</button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
