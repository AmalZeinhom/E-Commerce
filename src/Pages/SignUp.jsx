import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const passwordRegex = /^[A-Z][a-z,0-9]{5,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();

  const validationSchema = object({
    name: string("Name can only contain letters and spaces.")
      .required("Name is Requird")
      .min(3, "Name Must be Minimum 3 Characters")
      .max(20, "Name Must be Maximum 20 Characters"),
    email: string().required("Email is Requird").email("Invalid Email Format"),
    password: string()
      .required("Password is Requird")
      .matches(
        passwordRegex,
        "Password Must Start With Capital Letter Followed by 5 or More Characters"
      ),
    rePassword: string()
      .required("RePassword is Requird")
      .matches(passwordRegex)
      .oneOf([ref("password")], "Password Doen't Match"),
    phone: string()
      .required("Phone is Requird")
      .matches(phoneRegex, "Phone Must be Egyption Number"),
  });

  async function sendDataToRegister(values) {
   const loadingToast =  toast.loading('Loading..', {duration: 6000 ,iconTheme: {primary: "#00cc74", secondary: "#fff"}})
    try {
            const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Account Registered Successfuly!");
      navigate('/')
    } 
    catch (error) {
     toast.error(error.response.data.message)
     
    }
    finally{
      toast.dismiss(loadingToast)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  return (
    <div className="py-5 d-flex justify-content-center align-items-center flex-column register-card">
      <div className="d-flex gap-3 justify-content-center align-items-center mb-3">
        <FontAwesomeIcon icon={faUser} className="registerTitle" />
        <h1 className="registerTitle">Registre Now</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center flex-column w-50"
      >
        <input
          type="text"
          className="form-control custom-input my-1"
          placeholder="Enter Your Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-danger my-1 msg">{formik.errors.name}</p>
        )}

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

        <input
          type="phone"
          className="form-control custom-input my-1"
          placeholder="Enter Your Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-danger my-1 msg">{formik.errors.phone}</p>
        )}

        <input
          type="password"
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

        <input
          type="password"
          className="form-control custom-input"
          placeholder="Enter Your Re-Password"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <p className="text-danger my-1 msg">{formik.errors.rePassword}</p>
        )}

        <button
          type="submit"
          className="register-btn border-0 text-white rounded-2 mt-2 py-1 fs-5 fw-medium"
        >
          Sign UP
        </button>

        <NavLink to={'/login'} className="nav-login mt-2 text-center fw-medium mt-3">Already have an account?</NavLink>
      </form>
    </div>
  );
}
