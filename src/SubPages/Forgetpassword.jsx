import React, { useState } from "react";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Forgetpassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const loadingToast = toast.loading("Loading..", {
      duration: 6000,
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );

      toast.success("OTP Sent to Your Email.");
      navigate("/verify", { state: { email } });
      console.log(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="py-5 d-flex justify-content-center align-items-center flex-column register-card w-50 mx-auto">
      <div className="d-flex gap-3 justify-content-center align-items-center mb-3">
        <FontAwesomeIcon icon={faUnlockAlt} className="registerTitle" />
        <h1 className="registerTitle">Forgot Your Password</h1>
      </div>

      <p className="resetEmail">Your password will be reset by email</p>

      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center flex-column w-50"
      >
        <input
          type="email"
          className="form-control custom-input my-1"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="register-btn border-0 text-white rounded-2 mt-2 py-1 fs-5 fw-medium w-100"
        >
          Next
        </button>

        <NavLink to={"/login"} className="nav-login mt-3 text-center fw-medium">
          Back To Login
        </NavLink>
      </form>
    </div>
  );
}
