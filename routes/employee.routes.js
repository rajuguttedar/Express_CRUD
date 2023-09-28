const express = require('express')
const {addEmployee,
getEmployee,
byName,
deleteEmployeeById,
deleteEmployeeByCustomId,
updateEmployeeByCustomId,
updateEmployeeById,
} = require('../controller/employee.contorller')


//* The express.Router() function is used to create a new router object. 
//* This function is used when we want to create a new router object in our program to handle requests.
//* Multiple requests can be easily differentiated with the help of the Router() function in Express.js.
//* This is the advantage of the use of the Router.

let router=express.Router()

router.post("/addemployee",addEmployee)
router.get("/getallemployee", getEmployee);
router.get("/byname/:id", byName);
router.put("/updateemployeebyid/:eid",updateEmployeeById);
router.put("/updateemployeebycustomid/:eid", updateEmployeeByCustomId);
router.delete("/deleteemployee/:eid",deleteEmployeeById)
router.delete("/deleteemployeebycustomid/:eid",deleteEmployeeByCustomId)


module.exports=router
