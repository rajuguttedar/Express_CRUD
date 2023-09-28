const Employee = require('../models/employee.model')

//* add employee
let addEmployee= async(req,res,next)=>{
  try{
    let {empId,empName,empSalary}=req.body
    let employee = await Employee.create({ empId, empName, empSalary });
    res.status(201).json({error:false, message:"Employee added successfully",data:employee})
  }
  catch(err){
     res.status(404).json({error:true, message:`the student of given body not added ${req.body}`, data:err.message})
  }
}

//*get all employee
let getEmployee = async (req, res, next) => {
  try{
    let fetchEmployee = await Employee.find({},{empId:1, empName:1,_id:0});
    res .status(200).json({ error: false, message: "emyployee fetched", data: fetchEmployee });
  }
  catch(err){
    //  res.status(404).json({error:true, message:`the Employee of given body not added ${req.body}`, data:err.message})
    next(err);
  }
};

//* get employee by using your own created Id
let byName=async(req,res,next)=>{
    let {id}=req.params
try{
  // let {empId,empName}=req.body //* this is not needed
let name = await Employee.findOne({empId:id}); //! first occurance
  res.status(200).json({error:false,message:"fetched particular",data:{empId:name.empId,empName:name.empName}})
}
catch(err){
  res.status(404).json({error:true, message:`Employee not found with given id ${id}`})
}
}

//* update by using default _Id created by mongodb
let updateEmployeeById=async(req,res,next)=>{
  let {eid}=req.params
try{
  let {empId,empName,empSalary}=req.body
  let singleEmployee=await Employee.findById(eid);
  let updateEmployee=await Employee.findOneAndUpdate({_id:eid},{empId,empName,empSalary},{new:true, runValidators:true})
  return res.status(200).json({error:false,message:`${updateEmployee.empName} salary updated from ${singleEmployee.empSalary} to ${updateEmployee.empSalary}`, data:updateEmployee})
}catch(err){
  return  res.status(404).json({error:true, message:`Employee not found with given id ${eid}`,data:err.message})
}
}

//* update by using your own created Id
let updateEmployeeByCustomId=async (req,res,next)=>{
  let {eid}=req.params
  let employee=await Employee.findOne({empId:eid});
    if(!employee){
   return res.status(404).json({error:true,message:`Employee not found with given id ${eid}`})
  }
try{
  let{empId,empName,empSalary}=req.body
  let updatedEmployee = await Employee.findOneAndUpdate({ empId:eid},{empId,empName,empSalary},{new:true,runValidators:true});
  return res.status(200).json({error:false,message:"employee updated",data:updatedEmployee})
}
catch(err){
   return  res.status(404).json({error:true,message:`Employee not found with given id ${eid}`,data:err.message})
}
}

//* delete employee by using default _Id created by mongodb
let deleteEmployeeById=async (req,res,next)=>{
      //! eid is having _id
  let {eid}=req.params
  let isAvailable=await Employee.findById(eid);
    if(!isAvailable){
   return res.status(404).json({error:true,message:`Employee not found with given id ${eid}`})
  }
try{
  let isAvailable=await Employee.findById(eid);
  let deletedemployee = await Employee.findByIdAndDelete(eid);
  res.status(200).json({error:false,message:`Employee deleted successufully`, data:deletedemployee})
}
catch(err){
  return  res.status(404).json({error:true, message:`Employee not found with given id ${eid}`,data:err.message})
}
}

//* delete employee by using your own created Id
let deleteEmployeeByCustomId=async (req,res,next)=>{
   let {eid}=req.params
  let isIdAvailable=await Employee.findOne({empId:eid})
  if(!isIdAvailable){
   return res.status(404).json({error:true,message:`Employee not found with given id ${eid}`})
  }
try{
  let deletedCustomEmployee=await Employee.findOneAndDelete({empId:eid})
  res.status(200).json({error:false,message:`Employee deleted with given Id ${eid}`, data:deletedCustomEmployee})
}
catch(err){
   return res.status(404).json({error:true,message:`Employee not found with given id ${eid}`,data:err.message})
}
}


module.exports = {
  addEmployee,
  getEmployee,
  byName,
  updateEmployeeById,
  updateEmployeeByCustomId,
  deleteEmployeeById,
  deleteEmployeeByCustomId,
};