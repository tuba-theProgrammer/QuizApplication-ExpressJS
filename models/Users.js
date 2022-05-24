const mongoose= require("mongoose")
const bcrypt = require('bcrypt')
var userSchema= new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    password:{
        type:String,
        required:true
       },
    email:{
        type:String,
        required:true
       }
})

userSchema.pre("save",(req,res,next)=>{
const user= this
bcrypt.hash(user.password,5,(err,hash)=>{
    console.log("Hashing")
user.password= hash
console.log(user.password)
next()
})
})

module.exports=   mongoose.model('User',userSchema)
