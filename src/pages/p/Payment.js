import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { BACKEND_URL } from "@/utils";

function Payment() {
  const [amount, setAmount] = useState("30");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [readyToPay, setReadyToPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const appearance2 = {
    theme: "stripe",

    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "2px",
      borderRadius: "4px",
      // See all possible variables below
    },
  };

  const appearance1 = {
    theme: "night",
    variables: {
      fontFamily: "Sohne, system-ui, sans-serif",
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: "#0A2540",
      colorPrimary: "#EFC078",
      colorPrimaryText: "#1A1B25",
      colorText: "white",
      colorTextSecondary: "#0A2540",
      colorTextPlaceholder: "#727F96",
      colorIconTab: "white",
      colorLogo: "dark",
      colorDanger: "#df1b41",
      borderRadius: "4px",
    },
    rules: {
      ".Input, .Block": {
        backgroundColor: "transparent",
        border: "1.5px solid var(--colorPrimary)",
      },
    },
  };
  const appearance3 = {
    theme: "stripe",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "2px",
      colorPrimary: "#f360a6",
      colorIconTabSelected: "#fff",
      spacingGridRow: "16px",
    },
    rules: {
      ".Tab, .Input, .Block, .CheckboxInput, .CodeInput": {
        boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
      },
      ".Block": {
        borderColor: "transparent",
      },
      ".BlockDivider": {
        backgroundColor: "#ebebeb",
      },
      ".Tab, .Tab:hover, .Tab:focus": {
        border: "0",
      },
      ".Tab--selected, .Tab--selected:hover": {
        backgroundColor: "#2446A4",
        color: "#fff",
      },
    },
  };
  const appearance = {
    theme: "night",
    labels: "floating",
    variables: {
      borderRadius: "4px",
    },
  };
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
    setLoading(true);
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
      setLoading(false);
      setReadyToPay(true);
    });
  };

  return (
    <div className=" mt-40 flex flex-col items-center rounded-sm ">
      {!readyToPay && (
        <div className="flex flex-col bg-white p-10 background-shadow-md rounded-xl mt-30">
          <div className="flex w-full justify-between border-b font-bold text-md my-2">
            <p>Select amount</p>
            <span>(USD)</span>
          </div>

          <div className="w-full flex flex-row justify-between my-2">
            <p> Enter Amount</p>
          </div>

          <div className="flex justify-between  my-2">
            <span className="font-bold mr-2">$</span>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={updateAmount}
              className="border border-blue-500"
            />
          </div>
          <div className="flex justify-between my-2">
            <p className="font-bold">Payment due</p>
            <span>${amount}.00</span>
          </div>
          <button
            type="button"
            className="bg-[#3A6EE4] text-white font-bold px-2 py-2 rounded"
            onClick={handleDeposit}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="">Loading...</span>
              </>
            ) : (
              `Confirm and pay $${amount} USD`
            )}
          </button>
        </div>
      )}
      <div className="bg-[#212D63] rounded-xl">
        {clientSecret && stripePromise && readyToPay && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <CheckoutForm amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Payment;
