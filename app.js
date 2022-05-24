const express = require("express")
const app=express()
const path = require('path')
var mongoose = require('mongoose')
var bodyParser= require('body-parser')
app.set(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
const usermiddleware= require('./Middleware/userMiddleware')

const userModel = require("./models/Users")
app.use(express.static(path.join(__dirname,'public')))

const mongoDb='mongodb://localhost:27017/Quiz-app'
mongoose.connect(mongoDb, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})



const QuizRoutes= require('./Routes/QuizRoutes')

app.use('/api',QuizRoutes)
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
app.post('/signUp',(req,res)=>{
  console.log(req.body)
    userModel.create(req.body, (err, user) => {
      if (err) {
       return res.redirect("/signup");
      }
      if(!user){
        return res.redirect("/signup");
      }
      
      res.redirect("/api/dashboard");
    });  
 
})



// showing Login page
app.get('/login',(req,res)=>{
  res.render("signIn.ejs",{
    title:'Login Page',
   })
})


app.post('/login',(req,res)=>{
  console.log(req.body.password)
     userModel.findOne({
       name:req.body.name,
       password:req.body.password
     },(err,user)=>{
       if(err){
         console.log(err)
         return res.status(500).send()
       }
       if(!user){
         console.log("user not found")
         return res.status(404).send()
       }
       return res.redirect('/api/dashboard')
     })
})

// handling user logout
app.get('/logout',(req,res)=>{
  console.log('logging out')
})



app.use('*',(req,res)=>{
  res.status(404).json({msg:"Not found"})
})


app.listen(3000,()=>{
  console.log('hello mai ab phir ap hi ko sun rha hn')
})