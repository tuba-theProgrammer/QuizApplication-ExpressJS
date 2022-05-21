const express = require("express")
const app=express()
const path = require('path')
var mongoose = require('mongoose')
var bodyParser= require('body-parser')
app.set(express.static(path.join(__dirname,"/public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

const mongoDb='mongodb+srv://tubaAsif:shabana1234@cluster0.soo8g.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDb, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})

app.get('/',(req,res)=>{
  res.render("signIn.ejs")
})

app.get('/signUp',(req,res)=>{
  res.render("signUp.ejs")
})

app.use('*',(req,res)=>{
  res.status(404).json({msg:"Not found"})
})


app.listen(5000,()=>{
  console.log('hello mai ab phir ap hi ko sun rha hn')
})