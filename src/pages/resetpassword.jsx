import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";
import { setAuthUser } from "@/store/slices/authSlice";
import { setAuthState } from "@/store/slices/authSlice";
const RequestResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/resetpassword`, {
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center mt-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      {message == "" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset"}
          </button>
        </form>
      ) : (
        <div className="text-secondary">{message}</div>
      )}
    </div>
  );
};

export default RequestResetPassword;
