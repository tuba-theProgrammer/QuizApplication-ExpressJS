const mongoose= require("mongoose")
const bcrypt = require('bcrypt')
var userSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String
})

userSchema.pre("save",(req,res,next)=>{
const user= this
bcrypt.hash(user.password,5,(err,hash)=>{
user.password= hash
console.log(user.password)
next()
})
})

module.exports=   mongoose.model('User',userSchema)
