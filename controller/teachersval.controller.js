const { invitation,sendOTPtoEmail,generateOTP, sendOtp } = require('../helper/emailHelper');
const { createOtp } = require('../helper/otpHelper');
const TeachersVal = require('../models/teachersval.model')
require("dotenv").config();
let jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcryptjs = require("bcryptjs");


let registerTeacher=async(req,res,next)=>{
    try{
        let {name,email,password}=req.body
        // let salt=await bcryptjs.genSalt(10)
        // let hashedPassword=await bcryptjs.hash(password,salt)
        let isAvailableTeacher=await TeachersVal.findOne({email})
        if(!isAvailableTeacher){
            // let teacher=await TeachersVal.create({name,email,password:hashedPassword})
            let otp=otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
            // invitation(email,name)
            let teacher=await TeachersVal.create({name,email,password,otp})
            sendOTPtoEmail(email, name, otp);
            return res.status(201).json({error:false,message:"teacher added",data:teacher})
        }
            return res.status(409).json({error:true,message:"teacher already exist"})
    }
    catch(err){
        next(err)
    }
}

let loginTeacher=async(req,res,next)=>{
    try{
        let {email, password } = req.body;

        let isAvailableTeacher = await TeachersVal.findOne({ email });
        if(!isAvailableTeacher){
            return res.status(404).json({error:true,message:`no teacher found with given email ${email}`})
        }

        // let hashedPassword=await bcryptjs.compare(password,isAvailableTeacher.password)
        let hashedPassword=await isAvailableTeacher.compareMyPassword(password);
        // if(password===isAvailableTeacher.password){
        if(hashedPassword){
            let token= jwt.sign({email:isAvailableTeacher.email,name:isAvailableTeacher.name}, process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRESIN})
            console.log(token)
            return res.status(201).json({error:false,message:`login successful with given password '${password}'`,token})
        }
        else{
            return res.status(401).json({error:true,message:`the given password '${password}' is invalid password`})
        }
    }
    catch(err){
        next(err)
    }
}

let verifyTeacher=async(req,res,next)=>{
    try{
        let {email,otp}=req.body
        let isTeacherAvailable=await TeachersVal.findOne({email});
        if(!isTeacherAvailable){
            return res.status(409).json({error:true,message:`Teacher not found with given email ${email}`})
        }

        // if(otp==isTeacherAvailable.otp){ //*This  compares the normal otp but not hashedotp
        let teacher=await bcryptjs.compare(otp,isTeacherAvailable.otp);
        if(teacher){
            return res.status(200).json({error:false,message:`OTP Verified successfully with given email '${email}'`})
        }
        else{
            return res.status(404).json({error:true, message:`OTP verification failed`})
        }
    }
    catch(err){
        next(err)
    }
}
// let getAllTeachers=async (req,res,next)=>{
//     try{
//         let authToken=req.headers.authorization;

//         if(!authToken || !authToken.startsWith("Bearer")){
//             return res.status(404).json({error:true,menubar:"token require"})
//         }

//         //* getiing the token without Bearer
//         let token=authToken.split(" ")[1];
//         let data = jwt.verify(token, "raju123");
//         console.log(data)
//         let teachers=await TeachersVal.find({},{_id:0})
//         return res.status(200).json({error:false,message:"teachers fetched successfull",data:teachers,user:data.name})
//     }
//     catch(err){
//     }
// }

let getAllTeachers=async (req,res,next)=>
{
    try
    {
        let teachers=await TeachersVal.find({},{_id:0});
        return res.status(200).json({error:false,message:"Teachers Fetched Successfully",
        data:teachers,user:req.user.email})
    }
    catch(err)
    {
        next(err)
    }
}

//* Resens OTP

let resendOTP=async(req,res,next)=>{
    try{
        let {email}=req.body
        let isTeacherAvailable=await TeachersVal.findOne({email});
        if(!isTeacherAvailable){
            return res.status(409).json({error:true,message:`Teacher Not Found With Given email ${email}`})
        }

        let {hashedotp,otp}=await createOtp();
        console.log(hashedotp,otp)
        let teacher = await TeachersVal.findOneAndUpdate({ email },{ otp:hashedotp }, { new: true, runValidators: true, expiresIn:"30s"});

        sendOtp(email, otp, TeachersVal.name);

        return res.status(201).json({ error: false, message: " successfully resend OTP", data: teacher });
    }
    catch(err){
        next(err);
    }
}

//* ResetPassword
let resetPassword=async(req,res,next)=>{
    try{
        let {email,password}=req.body
        let isTeacherAvailable=await TeachersVal.findOne({email});
        if(!isTeacherAvailable){
            return res.status(409).json({error:true,message:`teacher not found with given email ${email}`});
        }
        let hashPass=await bcryptjs.hash(password,10)
        let resetPass=await TeachersVal.findOneAndUpdate({email},{password:hashPass},{new:true,runValidators:true});
        console.log(password,resetPass.password)
        return res.status(200).json({error:false,message:`password updated with given email ${email}`,data:resetPass})
    }
    catch(err){
        next(err)
    }
}








//* send otp to email
let sendOTP=async(req,res,next)=>{
    try{
        let {name,email,password}=req.body
        let isAvailableTeacher=await TeachersVal.findOne({email})
        if(!isAvailableTeacher){
            // let teacher=await TeachersVal.create({name,email,password:hashedPassword})
            // let otp=generateOTP();
            let otp=otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
            console.log(otp)
            sendOTPtoEmail(email,name,otp)
            let teacher=await TeachersVal.create({name,email,password,otp})
            return res.status(201).json({error:false,message:"teacher added",data:teacher})
        }
            return res.status(409).json({error:true,message:"teacher already exist"})
    }
    catch(err){
        next(err)
    }
}

let verifyOTP=async(req,res,next)=>{
    try{
        let {email ,otp} = req.body;
        let isAvailableTeacher = await TeachersVal.findOne({ email });
        if(!isAvailableTeacher){
            return res.status(404).json({error:true,message:`no teacher found with given email ${email}`})
        }
            // let hashedPassword=await isAvailableTeacher.compareMyPassword(password);
        if(otp===isAvailableTeacher.otp){
        // if(hashedPassword){
            return res.status(201).json({error:false,message:`login successful with given password  and verified with otp ${otp}'`})
        }
        else{
            return res.status(401).json({error:true,message:`the given otp '${otp}' is invalid otp`})
        }
    }
    catch(err){

    }
}
module.exports={
    registerTeacher,
    loginTeacher,
    sendOTP,
    verifyOTP,
    getAllTeachers,
    resendOTP,
    verifyTeacher,
    resetPassword
}