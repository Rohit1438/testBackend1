const mongoose=require("mongoose")

const userSchema =new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
role:{type:String,enum:["admin","explorer"],required:true},
password:{type:String,required:true},



})

module.exports=mongoose.model("User",userSchema)


// {
//   "username": "su",
//   "email":"rohitt@gmail.com",
//     "role":"admn",
//   "password": "#Rohit1234",
//   "role":"kolkata"
// }