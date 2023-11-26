import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { BACKEND_URL } from "@/utils";
import { setAuthUser } from "@/store/slices/authSlice";
import { setAuthState } from "@/store/slices/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email,
        password,
      });
      const userId = await response.data.userId;
      const token = await response.data.token;
      const freelancer = await response.data.freelancer;
      const employer = await response.data.employer;
      const mincom = await response.data.mincom;
      const token2 = await response.data.token2;
      Cookies.set("userId", userId);
      dispatch(setAuthState(true));
      dispatch(setAuthUser(userId));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("freelancer", freelancer);
      localStorage.setItem("employer", employer);
      localStorage.setItem("mincom", mincom);
      localStorage.setItem("token2", token2);

      router.push("/myprofile");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center mb-16">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
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
          {loading ? "Loading..." : "Login"}
        </button>
        <Link href="/register">
          <span className="text-blue-300">Not registered?</span>Register
        </Link>
        <Link href="/resetpassword">
          <span className="text-blue-300">Forgot password?</span>Reset
        </Link>
      </form>
    </div>
  );
};

export default Login;
