# Here is how payments in stripe work.

### There are two ways to do it, either using payment sessions or payment intents, but the method mentioned below uses PaymentIntent API which you will use with custom payment flow instead of prebuilt checkout page that uses sessions.

- A person adds stuff in cart and clicks the "checkout" button.
- All the details regarding what they want to buy, and the payment method (card, vouchers, wallets etc.) are sent to the backend.
- Using custom logic, calculate the amount to be charged, figure out the currency etc on the backend (customizable though) because what are you going to charge for any product depends upon you. And finally send all the information to the **paymentIntents** API and invoke **create method**.
- The API will return an object that will contain everything stripe needs to process the payment, here take a loot [The payment intent object](https://stripe.com/docs/api/payment_intents/object?lang=node) (You can read the entire flow). Since there are a lot of moving parts when it comes to payment intent, you can read about it here [How intents work](https://stripe.com/docs/payments/intents).
- Now, we need confirmation on the frontend, where we see the amount details etc and provide the billing details and confirm the payment, but how will we know "for what order am I confirming the payment ?", because the all the details like price, payment method etc are present in the "payment intent" on the backend. You guessed it right! we send it to the frontend.
- But, we cannot pass the entire payment intent to the frontend, it contains security issues and we need security here, payment intents got you convered, there is a **Client secret** present in the payment intent object that 