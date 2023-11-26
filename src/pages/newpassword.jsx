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
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { pid, token } = router.query;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/reset/${pid}/${token}`,
        {
          password: password,
        }
      );
      setPassword("");
      setPassword2("");
      toast(response.data.message);
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">New Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            New Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`${
              password2 !== "" && password === password2
                ? " border border-green-400"
                : " border border-red-400"
            } px-4 py-2  rounded-md focus:outline-none `}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Re-Enter New Password
          </label>
          <input
            id="password2"
            type="password"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            className={`${
              password2 !== "" && password === password2
                ? " border border-green-400"
                : " border border-red-400"
            } px-4 py-2  rounded-md focus:outline-none `}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset password"}
        </button>
        <div className="mx-2 text-red-700">
          {password2 !== "" && password === password2
            ? ""
            : "Password doesn't match"}
        </div>
        <Link href="/login">
          <span className="text-blue-300">Back to login?</span>Login
        </Link>
      </form>
    </div>
  );
};

export default NewPassword;
