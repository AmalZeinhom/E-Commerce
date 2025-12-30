import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyOTP() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [resetCode, setResetCode] = useState("");
  const navigate = useNavigate();

  async function handleVerify(e) {
    e.preventDefault();

    const loadingToast = toast.loading("Loading..", {
      duration: 6000,
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: resetCode.trim() }
      );
      toast.success("Code verified!");
      navigate("/resetPassword", { state: { email, resetCode } });
    } catch (error) {
      toast.error("Invalid or expired code");
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="py-5 d-flex justify-content-center align-items-center flex-column register-card w-50 mx-auto">
      <div className="d-flex gap-3 justify-content-center align-items-center mb-3">
        <FontAwesomeIcon icon={faMessage} className="registerTitle" />
        <h1 className="registerTitle">Check Your Email</h1>
      </div>

      <form
        onSubmit={handleVerify}
        className="d-flex justify-content-center flex-column w-50"
      >
        <input
          type="text"
          className="form-control custom-input my-1"
          placeholder="Enter Reset Code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
        />

        <button
          type="submit"
          className="register-btn border-0 text-white rounded-2 mt-2 py-1 fs-5 fw-medium w-100"
        >
          Next
        </button>
      </form>
    </div>
  );
}
