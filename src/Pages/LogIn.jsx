import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { authContext } from "../Context/AuthContext";

export default function Login() {
  const passwordRegex = /^[A-Z][a-z,0-9]{5,}$/;
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState("password");
  let {setToken, verifyToken} = useContext(authContext);

  const validationSchema = object({
    email: string().required("Email is Requird").email("Invalid Email Format"),
    password: string()
      .required("Password is Requird")
      .matches(
        passwordRegex,
        "Password Must Start With Capital Letter Followed by 5 or More Characters"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  async function sendDataToLogin(values) {
    const loadingToast = toast.loading("Loading..", {
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("isFirstLogin", true);

      localStorage.setItem("token", data.token);
      setToken(data.token)
      verifyToken()
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  function toggleShowPass() {
    setShowPass(showPass === "password" ? "text" : "password");
  }

  return (
    <div className="py-5 d-flex justify-content-center align-items-center flex-column register-card">
      <div className="d-flex gap-3 justify-content-center align-items-center mb-3">
        <FontAwesomeIcon icon={faUser} className="registerTitle" />
        <h1 className="registerTitle">Login</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center flex-column w-50"
      >
        <input
          type="email"
          className="form-control custom-input my-1"
          placeholder="Enter Your Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-danger my-1 msg">{formik.errors.email}</p>
        )}

        <div className="position-relative">
          <input
            type={showPass}
            className="form-control custom-input my-1"
            placeholder="Enter Your Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-danger my-1 msg">{formik.errors.password}</p>
          )}

          <div
            className="position-absolute end-0 eye-pass translate-middle-y me-3 cursor-pointer"
            onClick={toggleShowPass}
            style={{ width: "20px", height: "20px" }}
          >
            {showPass === "password" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              
              
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="register-btn border-0 text-white rounded-2 mt-2 py-1 fs-5 fw-medium w-100"
        >
          Log IN
        </button>

        <NavLink
          to={"/forgotPassword"}
          className="nav-login mt-3 text-center fw-medium"
        >
          Forgot Your Password?
        </NavLink>

        <button
          type="button"
          className="register-btn border-0 text-white rounded-2 mt-4 mx-auto py-1 fs-6 fw-medium w-50"
        >
          Create New Account
        </button>
      </form>
    </div>
  );
}
