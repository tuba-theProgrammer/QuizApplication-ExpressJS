const express= require('express')
const QuizController = require('../Controllers/quizController')

const app= express()
app.get('/dashboard',QuizController.dashboardScreen)
app.get('/createQuiz',QuizController.ShowCreateQuiz)
app.post('/addQuestion',QuizController.addQuestion)
app.get('/ViewQuestions',QuizController.ViewQuestion)
app.get('/deleteQuestion', QuizController.deleteQuestion)
app.get('/UpdateQuestion', QuizController.showUpdateQuestion)
app.post('/UpdateQuestion', QuizController.UpdateQuestion)
app.get('/PlayQuiz',QuizController.PlayQuiz)
 app.get('/ShowScore',QuizController.ShowScore)
 module.exports=app