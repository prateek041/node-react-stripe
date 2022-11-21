import React from "react";
import ReactDOM from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js"; // loadstripe is a helper function.
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";

const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // the provider will give help stripe access all the stripe elements in React.
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
