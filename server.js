const express = require('express')
const app = express()

// getting stripe here and attaching the secret test key, node will attach that key to all requests to stripe API.
const stripe = require("stripe")()
// This is the basic home route.
app.get("/", (req, res)=>{
	res.status(200).send("This is the homepage")
})

// This is the route to create payment intent
app.post("/create-payment-intent", async(req, res)=>{
	res.status(200).send("This is the payment page")
})

app.listen(9090, ()=>{
	console.log("Listening to port 9090")
})