import { useState } from "react";

import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { BACKEND_URL } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import { set } from "react-hook-form";
const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripePromise = loadStripe(secretKey);

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();

  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded
    }
    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const response = await fetch(`${BACKEND_URL}/api/deposit`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        payment_method_id: paymentMethod.id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const { client_secret } = await response.json();

    //const stripe = await stripePromise;

    const result = await stripe.confirmCardPayment(client_secret);

    if (result.error) {
      setMessage(`Error: ${result.error.message}`);
      toast.error(`${result.error.message}`);
      setProcessing(false);
    } else {
      setPaymentStatus(true);
      setProcessing(false);
      setMessage("Payment successful!");
      toast.success("Payment successful!");
    }
  };
  /* event.preventDefault();
    setProcessing(true);
    setError(null);

    // Create a payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // Call the /charge endpoint with the payment details
    const response = await fetch(`${BACKEND_URL}/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        email: email,
        payment_method_id: paymentMethod.id,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setError(errorMessage);

      setProcessing(false);
      return;
    }

    // Payment succeeded, update user's balance or show success message
    const result = await response.json();
    console.log(result);
  }; */

  /*   const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // Create a payment method using the card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // Call the /charge endpoint with the payment details
    const response = await fetch(`${BACKEND_URL}/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        email: email,
        payment_method_id: paymentMethod.id,
      }),
    });

    if (!response.ok) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    // Payment succeeded, update user's balance or show success message
    const result = await response.json();
    console.log(result);
  }; */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ToastContainer />
      <h1 className="font-bold py-4 mb-4">Fund Your Account</h1>
      {paymentStatus ? (
        <div className="bg-gray-100 ">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Deposit Successful!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your deposit.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link
                  href="/finance"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </Link>
              </div>
              <div className="py-10 text-center">
                <button
                  onClick={() => setPaymentStatus(false)}
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Deposit Again
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-bold mb-2"
              >
                Amount (USD)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="card-element"
                className="block text-gray-700 font-bold mb-2"
              >
                Credit or debit card
              </label>
              <CardElement
                id="card-element"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 active:bg-blue-800 w-full sm:w-auto"
            >
              {processing ? "Processing..." : "Pay"}
            </button>
          </form>
          <div className="py-10 text-center">
            <Link
              href="/finance"
              className="px-12 bg-primary hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
const Wrappere = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);
export default Wrappere;
