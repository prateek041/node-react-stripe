import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Card = () => {
  const elements = useElements(); // to access all the mounted stripe elements, using the provider.
  const stripe = useStripe(); // to reference stripe.

  const handleSubmit = async (e) => {
    e.preventDefault(); // not submitting the form directly
    // three step process,
    // 1: Check if stripe has loaded ? if not, return nothing.
    if (!stripe || !elements) {
      return;
    }
    // 2: Use the create-payment-intent route in backend to get client secret.
    const { clientSecret } = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "INR",
      }),
    }).then((r) => r.json()); // here the client secret is returned, convert it into json.

    // 3: Confirm payment.
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // take the details present in the card element.
        },
      });

    if (stripeError) {
      return stripeError;
    }
  };

  // The payment was complete, check stripe dashboard.

  return (
    <>
      <div>This is a card</div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Card;
