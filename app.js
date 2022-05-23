const express = require("express")
const app=express()
const path = require('path')
var mongoose = require('mongoose')
var bodyParser= require('body-parser')
app.set(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

const userModel = require("./models/Users")
const quizModel = require("./models/QuizModel")
app.use(express.static(path.join(__dirname,'public')))

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
app.post('/signUp',(req,res)=>{
 
    userModel.create(req.body, (err, user) => {
      console.log(req.body)
      if (err) {
        return res.redirect("/signup");
      }
      console.log(user);
      res.redirect("/dashboard");
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
       return res.redirect('/dashboard')
     })
})

app.get('/dashboard',(req,res)=>{
  res.render('dashboard')
})


app.get('/createQuiz',(req,res)=>{
  res.render('createQuizPage')
})

app.post('/addQuestion',async (req,res)=>{
  // const addQ= new quizModel({
  //   Question:req.body.Question,
  //   Options:req.body.Options,
  //   RighAnswer:req.body.RighAnswer,
  //   CreatedBy: req.query._id
  // })
  await quizModel.create( req.body,(err,user)=>{
    console.log(req.body)
    if(err){
       console.log(err)
     res.redirect('/')
    }else{
     
      return res.redirect('/createQuiz')
    }
   
  })
})

app.get('/ViewQuestions', async(req,res)=>{
  const data= await quizModel.find()
  res.render('ViewAllQuiz',{data})
})

app.get('/deleteQuestion', async(req,res)=>{
  const {id}= req.query
  await quizModel.findByIdAndRemove(id)
  const data= await quizModel.find()
  res.render('ViewAllQuiz',{data})
})


app.get('/UpdateQuestion', async(req,res)=>{
  const {id}= req.query

  console.log(id)
  const data= await quizModel.findById(id)
  console.log(data)
  res.render('UpdateQuiz',{data})
})

app.post('/UpdateQuestion', async(req,res)=>{
  const {id} = req.query
  const {question,options,RightAnswer}=req.body
  console.log(id)
  console.log(req.body)
  quizModel.findByIdAndUpdate(id,{question:question,options:options,RightAnswer:RightAnswer},(err,doc)=>{
    if(err){
     return res.redirect('/UpdateQuestion')
    }
    return res.redirect('/ViewQuestions')
  })
  
})

app.get('/PlayQuiz',(req,res)=>{
   res.sendFile(path.join(__dirname,'/public/html/playQuiz.html'))
})

app.get('/ShowScore',(req,res)=>{

})



// handling user logout
app.get('/logout',(req,res)=>{
  console.log('logging out')
})



app.use('*',(req,res)=>{
  res.status(404).json({msg:"Not found"})
})


app.listen(3001,()=>{
  console.log('hello mai ab phir ap hi ko sun rha hn')
})