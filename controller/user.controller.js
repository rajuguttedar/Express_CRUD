const { invitaionMail, sendOtp } = require("../helper/emailHelper");
const {createOtp} = require('../helper/otpHelper')
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

let createUser = async (req, res, next) => {
  try {
    let { fullname, email, role } = req.body;

    let isUserAvailable = await User.findOne({ email });

    if (isUserAvailable) {
      return res.status(500).json({ error: true, message: "User Already Exists" });
    }

    let user = await User.create({ fullname, email, role });
    invitaionMail(email, fullname, role);

    return res.status(201).json({ error: false, message: "User Added Successfully", data: user });
  } 
  catch (err) {
    next(err);
  }
};

let loginUser = async (req, res, next) => {
  try {
    let { email } = req.body;
    let isUserAvailable = await User.findOne({ email });

    if (!isUserAvailable) {
      return res.status(500).json({ error: true,message: `User Not Found with given email ${email}`});
    }

    // let otp = Math.floor(Math.random() * 899999 + 100000);
    let {hashedotp,otp}=await createOtp();
    console.log(hashedotp,otp)
    let user = await User.findOneAndUpdate({ email },{ hashedotp }, { new: true, runValidators: true, expiresIn:"30s"});

    sendOtp(email, otp, user.fullname);

    return res.status(201).json({ error: false, message: "User Added Successfully", data: user });
  } 
  catch (err) {
    next(err);
  }
};

let userVerification=async (req,res,next)=>{
    try{
        let{email,otp}=req.body;

        let isAvailable=await User.findOne({email});
        if(!isAvailable){
            return res.status(500).json({error:true,message:`user not found with given email ${email}`})
        }

        let isTrue=await bcryptjs.compare(otp,isAvailable.hashedotp);
        if(isTrue){
          let token=jwt.sign({email:isAvailable.email,name:isAvailable.fullname,
                _id:isAvailable._id}, 
                process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRESIN})
            return res.status(201).json({error:false,message:"Login Successfull",token})
        }
        return res.status(500).json({error:true,message:"OTP verification failed"})
    }
    catch(err){
        next(err)
    }
}

module.exports = {
  createUser,
  loginUser,
  userVerification
};
