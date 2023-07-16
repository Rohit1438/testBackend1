const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Post = require("../Models/postModel");
const jwt = require("jsonwebtoken");
const { auth } = require("../Middleware/auth");
router.post("/",auth, async (req, res) => {


  // const token = req.headers.authorization?.split(" ")[1];
  // console.log("i am post route");


//FOR MANUAL VERIFICATION PASSWORD IS USING
  // const password = req.query.password;
  try {



    //Verification JWT
//    const decoded= jwt.verify(token, "secret7");

// if(!decoded){
//   res.send("not autho")
// }


    //Manual verification way

    // if(password!=="js147"){
    //     res.send("Login first")
    // }

    const { title, content } = req.body;
    //Must use await  here
    const post = await new Post({ title, content,creator:req.userId,name:req.username});
    console.log(req.userId,":post")

    await post.save();
    //populating
    await post.populate("creator")
   await res.status(200).send(post);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get",auth, async (req, res) => {


  // const token = req.headers.authorization?.split(" ")[1];
  // console.log("i am post route");

  try {


    // Verification JWT
    // const decoded = jwt.verify(token, "secret7");

    // if (!decoded) {
    //   res.send("not autho");
    // }

    const posts = await Post.find({}); // Remove the 'new' keyword here

    await res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
});



router.get("/search",auth, async (req, res) => {
  try {
   

const {searchQuery}=req.query

const title=new RegExp(searchQuery,"i")
const posts = await Post.find({title});
    await res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/update/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.creator && post.creator.toString() !== req.userId) {
      return res.status(403).send("Not allowed");
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).send(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


router.patch("/like/:postId", auth, async (req, res) => {
  try {
    const postId = req.params.postId;
//finding the particular post
    const post = await Post.findById(postId);

    const index=post.likes.findIndex((id)=>id===String(req.userId))

    if(index==-1){
      post.likes.push(req.userId)
    }else{
    post.likes=  post.likes.filter(id=>id!==String(req.userId))

    }
const updatedPost=await Post.findByIdAndUpdate(req.params.postId,post,{new:true})

    res.status(200).send(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
