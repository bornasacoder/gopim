import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { BACKEND_URL } from "@/utils";

function Payment() {
  const [amount, setAmount] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [readyToPay, setReadyToPay] = useState(false);

  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51IzMfQFKLJLnm31NSXBmGQGqnTxoo6Kxx53qmBdguFmweGBDemJnrSzpOpdHBcsOi7RcSYUBblmLktNTKY8olKan00CQu7CLrK"
      )
    );
  }, []);
  const updateAmount = (e) => {
    setAmount(e.target.value);
  };
  const MoveToPayView = () => {
    setReadyToPay(true);
  };

  const handleDeposit = () => {
    fetch(`${BACKEND_URL}/api/depo`, {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(async (result) => {
      var { client_secret } = await result.json();
      setClientSecret(client_secret);
      setReadyToPay(true);
    });
  };

  return (
    <div className="mt-40">
      <h1>React Stripe and the Payment Element</h1>
      <div className="flex flex-col bg-blue-300 mt-30">
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={updateAmount}
        />
        <button type="button" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
      {clientSecret && stripePromise && readyToPay && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
