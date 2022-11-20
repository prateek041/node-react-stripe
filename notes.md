# Here is how payments in stripe work.

## This walkthrough is going to be for web, using node js and React.

It all starts with the API keys, they are of four types, but we will only talk about 2, publishable and secret key.

Eventually all your requests are going to be sent to the Stripe API for payment processing, and stripe needs to know that the payments are related to you, hence the unique auth keys, but stripe has seperated them in publishable and secret because they have different authority to what they can do.

The ```publishable key``` has less previlages and is usually exposed in the client side.

### There are two ways to do it, either using payment sessions or payment intents, but the method mentioned below uses PaymentIntent API which you will use with custom payment flow instead of prebuilt checkout page that uses sessions.

- A person adds stuff in cart and clicks the "checkout" button.
- All the details regarding what they want to buy, and the payment method (card, vouchers, wallets etc.) are sent to the backend.
- Using custom logic, calculate the amount to be charged, figure out the currency etc on the backend (you can ask for currency from the client-side as well) because what are you going to charge for any product depends upon you. And finally send all the information to the **paymentIntents** API and invoke **create method**.
- The API will return an object that will contain everything stripe needs to process the payment, here take a look [The payment intent object](https://stripe.com/docs/api/payment_intents/object?lang=node) (You can read the entire flow in the docs as well). Since there are a lot of moving parts when it comes to payment intent, you can read about it here [How intents work](https://stripe.com/docs/payments/intents).
- Now, we need confirmation on the frontend, where we see the amount details etc and provide the billing details and confirm the payment, but how will we know "for what order am I confirming the payment ?", because all the details like price, payment method etc are present in the "payment intent" on the backend. You guessed it right! we send it to the frontend.
- But, we cannot pass the entire payment intent to the frontend, for security related issues and there is no need of the entire object in the client side as well. Payment intents got you convered, there is a **Client secret** present in the payment intent object that can be used to uniquely identify the intent with the help of the stripe object**Publishable key** on the front-end.
- Here is how it goes, stripe-js provides us with a ```loadstripe``` function, which can be called with the publishable key and as a result all the requests to the stripe API will have that key attached to it. It sort of connects the front-end and the back-end of your payment process because now stripe know what your front-end and back-end is.
- Now all we have to do is, confirm the payment using ***stripe.confirmPayment*** and passing in the stripe element. Then redirect the user to "Payment succesful page".
- Now you can see the succesful payment details on the stripe dashboard.
