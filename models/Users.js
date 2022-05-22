const mongoose= require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')
var userSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String
})
userSchema.plugin(passportLocalMongoose)
var userModel = mongoose.Model('user',userSchema)
module.exports=  userModel
