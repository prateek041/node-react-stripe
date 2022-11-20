const express = require('express')
const app = express()

// JSON
app.use(express.json())

// dotenv for accesing .env file.
require('dotenv').config()

// getting stripe here and attaching the secret test key, node will attach that key to all requests to stripe API.
const stripe = require("stripe")(process.env.SECRET_KEY)

// This is the basic home route.
app.get("/", (req, res)=>{
	res.status(200).send("This is the homepage")
})

app.get('/config', (req, res)=>{
	res.status(200).send(process.env.PUBLISHABLE_KEY)
})

// this is where your business logic goes, you will get an item list from front-end that will
// contain ids of items your website sells, you will cross check their prices from the database
// and eventually pass the total amount to be paid.
const calculateAmount = (items)=>{
	// this is demo logic.
	const dummyPrice = 100

	return dummyPrice*items;
}

// This is the route to create payment intent
app.post("/create-payment-intent", async(req, res)=>{
	const {currency} = req.body // what do you want to buy ? and with what currency.

	const paymentIntent = await stripe.paymentIntents.create({ // this function creates the payment intent
		amount: calculateAmount(10),
		currency: currency,
		payment_method_types: ['card'] // we only support card payment at the moment.
	})

	res.status(200).send({
		clientSecret: paymentIntent.client_secret,
	})
})

app.listen(9090, ()=>{
	console.log("Listening to port 9090")
})