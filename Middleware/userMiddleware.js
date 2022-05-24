const userCheckMiddleware= (req,res,next)=>{
 const {name,email,password}= req.body
 if(!name||!email||!password){
     return res.redirect('/signUp')
 }
 next()
}
module.exports={userCheckMiddleware}