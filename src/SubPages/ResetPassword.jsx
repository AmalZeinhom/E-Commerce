import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const location = useLocation();
  const email = location.state?.email;
  const resetCode = location.state?.resetCode;
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const loadingToast = toast.loading("Loading..", {
      duration: 6000,
      iconTheme: { primary: "#00cc74", secondary: "#fff" },
    });
    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
          resetCode,
        }
      );
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="py-5 d-flex justify-content-center align-items-center flex-column register-card w-50 mx-auto">
      <div className="d-flex gap-3 justify-content-center align-items-center mb-3">
        <FontAwesomeIcon icon={faWrench} className="registerTitle" />
        <h1 className="registerTitle">Create New Password</h1>
      </div>

      <form
        onSubmit={handleReset}
        className="d-flex justify-content-center flex-column w-50"
      >
        <input
          type="password"
          className="form-control custom-input my-1"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control custom-input my-1"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="register-btn border-0 text-white rounded-2 mt-2 py-1 fs-5 fw-medium w-100"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
