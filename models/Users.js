const mongoose= require("mongoose")
var userSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String
})

module.exports=   mongoose.model('User',userSchema)
