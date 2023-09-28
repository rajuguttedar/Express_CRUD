 const express = require('express')
 require('dotenv').config()
 const cors = require('cors')
 require('./adapters/connectionDb')
 const {StatusCodes:{ACCEPTED,BAD_GATEWAY,NOT_FOUND}} = require('http-status-codes')
 const employeeRoutes = require('./routes/employee.routes')
 const teachersValRoutes= require('./routes/teachersval.routes')
 const userRoutes = require("./routes/user.routes");
 const studentRoutes= require('./routes/student.routes')
 const aluminiRoutes= require('./routes/alumini.routes')
 const taskRoutes= require('./routes/task.routes')

 //* Creates an Express application. The express() function is a top-level function exported by the express module.
 let app=express()

//* It is used to accept json data from the req body
 app.use(express.json())
app.use(cors())
//* Serves static file from our server
app.use(express.static('./public'))

//* Employee Routes
app.use("/api/employee",employeeRoutes)

//* Teacher Routes
 app.use("/api/teachersvalidation",teachersValRoutes)

//* User Routes
 app.use("/api/user", userRoutes);

//* Students Routes
 app.use("/api/student",studentRoutes)

//* Alumini Routes
 app.use("/api/alumini",aluminiRoutes)

 //*Task Routes
 app.use("/api/task",taskRoutes)

//* Page Not Found Middleware
 app.use("*",(req,res,next)=>{
    // res.status(404).json({error:true, message:"page not found"})
    res.status(NOT_FOUND).json({error:true, message:"page not found"})
 })

//* Error Handling Middleware
 app.use((err,req,res,next)=>{
  res.status(400).json({error:true, message:err.message,data:"it is error block"})
 })
 app.listen(process.env.PORT, () => {
   console.log(`server running on port ${process.env.PORT}`);
 });