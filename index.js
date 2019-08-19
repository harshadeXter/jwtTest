const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 8888;
app.use(bodyParser.json());
app.use(cors());
app.get('/time', (req,res) => {
  const time = (new Date()).toLocaleTimeString();
  res.status(200).send(`The Time is ${time}`);
});
app.get("*", (req, res) => {
  res.sendStatus(404);
});
app.listen(PORT, () => {     
  console.log(`Server is running on port ${PORT}.`); 
});
/*app.post("/login", (req,res) => {
  const user = req.body.username;
  res.status(200).send(`User's name is ${user}`);
});*/
app.post("/login", (req,res) =>{
	const users = [
		{id:1, username: "Harsha", password: "test1234"},
		{id:2, username: "testUser", password: "dexter123"}];
	const user = users.find((u) => {
		return u.username === req.body.username && u.password === req.body.password;
	});
	const token = jwt.sign({
		sub : user.id,
		username : user.username
	},
		"myKey", {expiresIn : "3 hours"});
	res.status(200).send({access_token : token})
	if(!req.body.username || !req.body.password){
		res.status(400).send("Error!! Please enter the correct username and password.");
		return;
		}
});

