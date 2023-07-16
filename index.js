const express = require("express");
const mongoose = require("mongoose");

const userRouter=require("./Routes/userRouter");
const postRouter = require("./Routes/postRoute");



const app = express();
app.use (express.json())
const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Rohit2002:20022003@cluster0.riuail2.mongodb.net/newTest2?retryWrites=true&w=majority"
    );
    console.log("conneted to mongoose");
  } catch (err) {
    console.log(err);
  }
};

app.get("/",(req ,res)=>{
  res.send("welcome to Homepage")
})
//if sombody want to visit /user Route use userRouter
app.use("/user",userRouter)
//if sombody want to visit /post Route use postRouter
app.use("/post",postRouter)
app.listen(8080, async () => {
    connection();
    console.log("Listening on port 8080");
  });
  