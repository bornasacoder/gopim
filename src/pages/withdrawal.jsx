import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import PaymentForm from "@/components/deposit";
import Wrapper from "@/components/deposit";
import Wrappere from "@/components/deposit";
import { BACKEND_URL } from "@/utils";
function WithdrawalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/withdraw`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201) {
        setIsLoading(false);
        toast.success("Withdrawal request submitted successfully");
        reset();
      } else if (response.status === 400) {
        setIsLoading(false);
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-4">
        <input
          type="hidden"
          id="user_id"
          name="user_id"
          value={"1"}
          {...register("user_id")}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.amount ? "border-red-500" : ""
          }`}
          {...register("amount", { required: true, min: 1 })}
        />
        {errors.amount?.type === "required" && (
          <p className="text-red-500 text-xs italic">Amount is required</p>
        )}
        {errors.amount?.type === "min" && (
          <p className="text-red-500 text-xs italic">
            Amount must be greater than 0
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isLoading ? "opacity-50 cursor-wait" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div className="py-10 text-center">
        <Link
          href="/finance"
          className="px-12 bg-primary hover:bg-indigo-500 text-white font-semibold py-3"
        >
          GO BACK
        </Link>
      </div>
    </form>
  );
}
function WithdrawalList(props) {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BACKEND_URL}/withdrawals/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setWithdrawals(data.withdrawal);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-4xl font-bold mb-8">Withdrawals</h1>
      {withdrawals?.length > 0 ? (
        <ul className="flex flex-col gap-4 w-full max-w-lg">
          {withdrawals.map((withdrawal) => (
            <li
              key={withdrawal.id}
              className="bg-white shadow-lg rounded-md p-6 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Withdrawal Request #{withdrawal.id}
                </h2>
                <span
                  className={`text-xl ${
                    withdrawal.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {withdrawal.status.toUpperCase()}
                </span>
              </div>
              <p className="text-lg font-medium">
                Amount: ${withdrawal.amount}
              </p>
              <p className="text-sm text-gray-500">
                Created on{" "}
                {new Date(withdrawal.creation_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg font-medium">No withdrawals found.</p>
      )}
    </div>
  );
}

function Withrawal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { register, errors } = useForm();
  const notify = (message) => toast(message);
  const [update, setUpdate] = useState(false);
  const toggleUpdate = () => setUpdate(!update);
  const handleSubmit = async (data) => {
    try {
      await axios
        .post(`${BACKEND_URL}/withdraw`, data, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4Mjk3Nzg0OCwianRpIjoiMDZlYzQyMWMtMzk0MS00YTZkLTg4NjItNzIxNDI2M2FjM2IwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6NywiZW1haWwiOiJ1Z2JvcmpvaG44QGdtYWlsLmNvbSIsInB1YmxpY19pZCI6ImU4NjdiYjNhLTlhNTAtNGU3Zi04MTRkLWQyNWY5NjRiNjEwYyIsImlzX3Byb3ZpZGVyIjp0cnVlLCJpc191c2VyIjpmYWxzZX0sIm5iZiI6MTY4Mjk3Nzg0OCwiZXhwIjoxNjgzMDY0MjQ4fQ.gNKAaqVwdGWHeWN1SXki9Ov0S8METXvudVFgjue5qSQ",
          },
        })
        .then((response) => {
          notify(response.data.success);
          if (response.data.user_id) toggleUpdate();
        });
      setIsSubmitted(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <ToastContainer />
      <div className="py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Withdrawal Form</h1>
        {!isSubmitted && <WithdrawalForm />}
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold mb-2">
              Withdrawal request submitted successfully!
            </p>
            <p>
              You will receive a confirmation email once your request has been
              processed.
            </p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold mb-2">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
      <WithdrawalList update={update} />
    </div>
  );
}

export default Withrawal;
