const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/userModel");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //checling if user is present or not
    const user = await User.findOne({ username });

    console.log("posting");
    //hasing the password 10 times
    const newPassword = await bcrypt.hash(password, 10);

    if (!user) {
      const newuser = await User.create({
        username,
        email,
        role,
        password: newPassword,
      });
      res.status(200).send(newuser);
    } else {
      res.send("already has an account");
    }

    //creating new object with updated password
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.send("first sign up");
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      res.status(401).send("Incorrect password");
    } else {
      //calling .sign method of jwt to generate token
      //we will use id to make the token
      const token = jwt.sign({ userId: user._id,username:username }, "secret7");

      res.status(200).send(token);
    }
  } catch (err) {
    console.log(err);
  }
});

//exporting router
module.exports = router;
