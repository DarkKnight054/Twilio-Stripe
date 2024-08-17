const express = require("express");
const bodyParser = require("body-parser");
const { sendSms } = require("./twilio/verify");
const { makePayment } = require("./stripe/payment");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
const userDatabase = [];
//route
app.post("/users", (req, res) => {
  const { email, password, phone } = req.body;
  const user = {
    email,
    password,
    phone,
  };

  userDatabase.push(user);
  const welcomeMessage = "Welcome to Chillz! Your verification code is 54875";
  sendSms(user.phone, welcomeMessage);
  res.status(201).send({
    message:
      "Account created successfully, kindly check your phone to activate your account!",
    data: user,
  });
});
app.post("/create-payment", (req, res) => {
  makePayment(req, res);
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
