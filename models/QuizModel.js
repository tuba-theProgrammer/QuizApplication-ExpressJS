const mongoose= require('mongoose')

const quizModel= new mongoose.Schema({
    Question: {
        type: String,
        required: true,
      },
      Options:[{type: String}],
      RightAnswer:{
         type : String,
      },
      CreatedBy:{
          type:ObjectId
      }
})

const quiz= mongoose.model('quiz',quizModel)
module.exports= quiz