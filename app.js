const express = require("express")
const app=express()
const path = require('path')
var mongoose = require('mongoose')
var bodyParser= require('body-parser')
app.set(express.static(path.join(__dirname,"/public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

const passport = require('passport')
const localStrategy = require('passport-local')
const passportLocalMongoose= require('passport-local-mongoose')
const user= require('./models/Users')

app.use(require("express-session")({
  secret:"Any normal Word",       //decode or encode session
  resave: false,          
  saveUninitialized:false    
}));


passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());


const mongoDb='mongodb+srv://tubaAsif:shabana1234@cluster0.soo8g.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDb, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})



  // showing Homepage
app.get('/',(req,res)=>{
  res.render("homePage.ejs",{
    title:'HomePage',
   })

})

// showing signup page
app.get('/signUp',(req,res)=>{
  res.render("signUp.ejs",{
    title:'Registration Page',
  })
})


// showing Login page
app.get('/login',(req,res)=>{
  res.render("signIn.ejs",{
    title:'Login Page',
   })

})

// handling user logout
app.get('/logout',(req,res)=>{
  console.log('logging out')
})

app.use('*',(req,res)=>{
  res.status(404).json({msg:"Not found"})
})


app.listen(5000,()=>{
  console.log('hello mai ab phir ap hi ko sun rha hn')
})