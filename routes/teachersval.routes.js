const express = require('express')
const { registerTeacher, loginTeacher, sendOTP, verifyOTP, getAllTeachers, resendOTP, verifyTeacher, resetPassword } = require('../controller/teachersval.controller')
const { sendOTPtoEmail } = require('../helper/emailHelper')
const { auth } = require('../services/authService')
let router=express.Router()

router.post("/addteachers",registerTeacher)
router.post("/loginteacher",loginTeacher)
router.post("/otp",sendOTP)
router.post("/verifyotp",verifyOTP)
router.get("/getteacher",auth,getAllTeachers)
router.post("/resendotp",resendOTP)
router.post("/verifyteacherotp",verifyTeacher)
router.post("/resetteacherpassword",resetPassword)
// router.get("/getteacher",getAllTeachers)

module.exports=router