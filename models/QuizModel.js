const mongoose= require('mongoose')

const quizModel= new mongoose.Schema({
    question: {
        type: String,
      },
      options:[{type: String}],
      RightAnswer:{
         type : String,
      },
      CreatedBy:{
          type:mongoose.Schema.ObjectId
      }
})

const quiz= mongoose.model('quiz',quizModel)
module.exports= quiz