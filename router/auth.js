const express = require('express');
const router = express.Router();
const { find } = require('../db/userschema');
require("../db/conn");
const User= require('../db/userschema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')


   


// REGISTER ROUTE

router.post('/register',async (req,res)=>{
 
 const {name,email,phone,profession,password}=req.body;
  if (!name || !email || !phone || !profession || !password){
      return res.status(422).json({error:"please fill all details"});
 }
 try {
    const userExist= await User.findOne({email:email});
    if(userExist){
        return res.status(422).json({error:"user already existed"});
    }
    const user = new User({name ,email,phone ,profession,password});
    
   await user.save();
   res.status(201).json({message:"user registered sucessfully"});
} catch (error) {
    res.status(500).send(error);
     
 }   
})

//LOGIN ROUTE

router.post('/login', async (req,res)=>{
    const {email,password}=req.body ;
    if (!email || !password) {
        return res.status(422).json({error:"please fill email and password"}) ;
    }
    try {
     const userLogin =  await User.findOne({email:email}); 

     if (userLogin ){
        const userValidation = await bcrypt.compare(password , userLogin.password); 
        const  token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken" , token ,{expires: new Date(Date.now()+ 25892000000),httpOnly:true})
       
          if (!userValidation){
              return res.status(400).json({error:"invalid credentials"});
            }
          else  {
                 return res.status(201).json({message:"user login successfully"})
                }
        
    }
    else {
     return res.status(400).json({error:"invalid credentials"})}
     
    } catch (error) { 
        console.log(error);
        
    }
})

//  Router About us 

router.get('/about' ,authenticate , (req,res) => {
    res.json(req.rootuser);
})

// Get user Data for Contact Page
router.get('/getData' ,authenticate , (req,res) => {
    res.json(req.rootuser);
})

// Router Contact page
router.post('/contact' ,authenticate , async (req,res) => {
    const {name ,email ,phone , subject ,message } = req.body;
       if (!(name && email && phone && subject && message)){
           console.log("Do not send empty message");
           res.status(422).json({Error: "Please fill the contact form"})
       }
   try {
       
       const contactUser = await User.findOne({_id : req.userId});
       if (contactUser){
           await contactUser.addMessage( subject ,message);
           await contactUser.save();
           res.status(201).json({message: "user messaged successfully"})
       }
   } catch (error) {
       console.log(error)
   }
   
});

//  ROUTE LOGOUT PAGE

router.get('/logOut' , (req,res) => {
    res.clearCookie("jwtoken" );
    res.status(200).send("User LogOut") ;
})
module.exports=router;