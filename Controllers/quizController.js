const quizModel = require("../models/QuizModel")

const dashboardScreen= async (req,res)=>{
    res.render('dashboard')
  }

const ShowCreateQuiz= async(req,res)=>{
    res.render('createQuizPage')
  }

const addQuestion= async (req,res)=>{
   
    await quizModel.create( req.body,(err,user)=>{
      console.log(req.body)
      if(err){
         console.log(err)
       res.redirect('/')
      }else{
       
        return res.redirect('/api/createQuiz')
      }
     
    })
  }

  const ViewQuestion= async(req,res)=>{
    const data= await quizModel.find()
    res.render('ViewAllQuiz',{data})
  }

  const deleteQuestion= async(req,res)=>{
    const {id}= req.query
    await quizModel.findByIdAndRemove(id)
    const data= await quizModel.find()
    res.render('ViewAllQuiz',{data})
  }

  const showUpdateQuestion= async(req,res)=>{
    const {id}= req.query
  
    console.log(id)
    const data= await quizModel.findById(id)
    console.log(data)
    res.render('UpdateQuiz',{data})
  }

const UpdateQuestion= async(req,res)=>{
    const {id} = req.query
    const {question,options,RightAnswer}=req.body
    console.log(id)
    console.log(req.body)
    quizModel.findByIdAndUpdate(id,{question:question,options:options,RightAnswer:RightAnswer},(err,doc)=>{
      if(err){
       return res.redirect('/api/UpdateQuestion')
      }
      return res.redirect('/api/ViewQuestions')
    })
    
  }
const PlayQuiz= async (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/html/playQuiz.html'))
 }
const ShowScore= async (req,res)=>{

}

module.exports={dashboardScreen,ShowCreateQuiz,addQuestion,deleteQuestion,
ViewQuestion,showUpdateQuestion,UpdateQuestion,PlayQuiz,ShowScore}