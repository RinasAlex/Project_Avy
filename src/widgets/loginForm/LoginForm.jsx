import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/slice/authActions";
import { getUserData } from "../../store/slice/userActions";
import CustomInput from "../../ui/customInput/CustomInput";
import s from "./LoginForm.module.css";
import logo from "../../assets/images/logo.svg";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      dispatch(getUserData(userToken));
    }

    if (userInfo && userInfo.roles) {
      if (userInfo.roles[0] === "ROLE_ADMIN") {
        navigate("/dashboard-admin");
      } else if (userInfo.roles[0] === "ROLE_USER") {
        navigate("/dashboard");
      }
    }
  }, [userToken, userInfo, dispatch, navigate]);

  const submitForm = async (data) => {
    try {
      await dispatch(userLogin(data));
    } catch (error) {
      console.error("Login failed:", error.message);

      if (error.message === "Incorrect credentials") {
        setLoginError("Incorrect email or password. Please try again.");
      } else {
        setLoginError("Something went wrong. Please try again later.");
      }

      return;
    }

    if (userInfo && userInfo.roles) {
      if (userInfo.roles[0] === "ROLE_ADMIN") {
        navigate("/dashboard-admin");
      } else if (userInfo.roles[0] === "ROLE_USER") {
        navigate("/dashboard");
      } else {
        setLoginError("Password or email incorrect");
      }
    } else {
      setLoginError("Password or email incorrect");
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
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
              <h2>Hi! Log in to your account.</h2>
              <p className={s.names}>Email</p>
              <CustomInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter your email"
                id="email"
              />
              <p className={s.error}>
                {errors.email && touched.email && errors.email}
              </p>
              <p className={s.names}>Password</p>
              <CustomInput
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                id="password"
              />
              <p className={s.error}>
                {errors.password && touched.password && errors.password}
              </p>
              <p className={s.error}>
                {loginError && loginError}
              </p>
              {/* <p>
                Don't have an account ?
                <span onClick={() => navigate("/register")}> Registration</span>
              </p> */}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
