const express = require("express");
const bodyParser = require("body-parser");
const expressjwt = require("express-jwt");
const app = express();
app.use(bodyParser.json());
const PORT =  5555;
app.get("/asset", (req, res) => {
	console.log("fuck happened");
  res.status(200).send("Everybody can see this");
});
const jwtCheck = expressjwt({    
  secret: "mykey"
});
app.get("/asset/secret", jwtCheck , (req, res) => {
  res.status(200).send("Only logged in people can see me");
});
app.get("*", (req, res) => {
  console.log("hit this");
  res.sendStatus(404);
});
app.listen(PORT, () => {     
  console.log(`Server is running on port ${PORT}.`); 
});
