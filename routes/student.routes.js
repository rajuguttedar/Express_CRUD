const express = require('express')
const { registerStudent, getStudents } = require('../controller/student.controller')


let router=express.Router()

router.post("/registerstudent",registerStudent)
router.get("/getallstudents",getStudents)

module.exports=router