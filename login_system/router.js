require('dotenv').config()
var express = require('express');
var router = express.Router();

// const credential = {
//     email: "paulson@gmail.com",
//     password: "1234"
// }

router.post('/login',(req,res)=>{
    if (req.body.email === process.env.email && req.body.password === process.env.password) {
        req.session.user = req.body.email;
         res.redirect('/route/dashboard');  
        // res.end("Login Successful...!")
    }
    else {
        res.end('Invalid Username')
    }
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send('Unauthorized User')
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
     
        if(err){
            console.log(err);
            res.send('Error')
        }else{
            res.render('base',{title:"Express",logout:"Logout Successfully...!"})
        }
    })
})

module.exports = router;