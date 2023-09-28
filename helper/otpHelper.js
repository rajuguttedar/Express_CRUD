const bcryptjs = require('bcryptjs')
const otpGenerator = require("otp-generator");

let createOtp=async()=>{
    // let otp=Math.floor(Math.random()*89999+100000).toFixed();
    let otp=otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    let salt=await bcryptjs.genSalt(10);
    let hashedotp=await bcryptjs.hash(otp,salt)
    return {hashedotp,otp}
}

module.exports={
    createOtp
}