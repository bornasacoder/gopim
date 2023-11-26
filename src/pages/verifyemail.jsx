import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "@/utils";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { pid, token } = router.query;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/verifyemail/${pid}/${token}`
      );

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
    <div className="flex flex-col h-screen justify-center items-center mt-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">
        Click on the button to verify your email
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-16">
        <button
          type="submit"
          className={`py-2 px-4 bg-blue-500 text-white font-medium rounded-md focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Verify email"}
        </button>

        <Link href="/login">
          <span className="text-blue-300">Back to login?</span>Login
        </Link>
      </form>
    </div>
  );
};

export default VerifyEmail;
