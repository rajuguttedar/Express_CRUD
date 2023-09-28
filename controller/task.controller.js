const  Task= require('../models/task.model')

let addTasks=async(req,res,next)=>{
    try {
        let {userId,task}=req.body;
        console.log("userId")
        userId=req.user._id;

        let addtask=await Task.create({userId,task})
        if(addtask){
            return res.status(201).json({error:false,message:"task added", data:addtask})
        }
        return res.status(500).json({error:false,message:"invalid task",data:task})
    } catch (error) {
        next(error)
    }
}

module.exports={
    addTasks
}