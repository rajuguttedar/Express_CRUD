const express = require('express')
const { addTasks } = require('../controller/task.controller')
const { auth } = require('../services/authService')

let router=express.Router()

router.post("/addtask",auth,addTasks)

module.exports=router