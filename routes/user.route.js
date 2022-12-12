const express=require("express")
const{ UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userController=express.Router()


userController.post("/signup",async(req,res)=>{
    const{email,password}=req.body;
    bcrypt.hash(password,6,async function(err,hash){
        if(err){
            res.send("Something went wrong")
        }

        const user=new UserModel({
            email,
            password:hash,
            IP:req.ip
        })
        try{
    
            await user.save()
            res.send({"masg":"Signup sucessfull{"})
    
        }catch(err){
          console.log(err)
          res.send({"masg":"Signup failed"})
        }
    })
})

userController.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    const user=await UserModel.findOne({email})

    const hashed_password=user.password

    bcrypt.compare(password,hashed_password, function (err,result){
        if(err){
            res.send("Something went wrong")
        }

        if(result){
            const token=jwt.sign({userId:user._id},process.env.PRIVATE_KEY);
            res.send({"msg":"Login sucessfull",token:token})
        }else{
            res.send({"msg":"Invalid credentials ",token:token})
        }
    })


})





module.exports={userController}