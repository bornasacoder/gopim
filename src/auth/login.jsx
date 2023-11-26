import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";

import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { setAuthUser } from "@/store/slices/authSlice";
import { setAuthState } from "@/store/slices/authSlice";
function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      props.setIsLoggedIn(true);

      props.handleCloseModal();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
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
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
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
            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`py-2 px-4 bg-[#2448c6] hover:bg-[#4865cc] text-white font-medium rounded-md focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <button
          type="button"
          onClick={() => {
            props.gotoRegisterView();
          }}
        >
          <span className="text-[#2448c6]">Not registered?</span>
          &nbsp;&nbsp;Register
        </button>
      </form>
    </div>
  );
}

export default Login;
