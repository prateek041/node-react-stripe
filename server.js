const express = require('express')
const app = express()

app.use("/", (req, res)=>{
	res.status(200).send("This is the homepage")
})

app.listen(9090, ()=>{
	console.log("Listening to port 9090")
})