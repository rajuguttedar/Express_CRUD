const  Student= require('../models/student.model')

//* student registration or adding students
let registerStudent=async(req,res,next)=>{
    try{
        let {name,age,gender,fees,marks}=req.body
        let student=await Student.create({name,age,gender,fees,marks});
        return res.status(201).json({error:false,message:`student added successfully`,data:student})
    }
    catch(err){
        next(err)
    }
}


//* get all students
let getStudents=async(req,res,next)=>{
    try{
        let {gender,name,fees,sort,fields,page,limit}=req.query;
        let queryObject={};

        if(gender){
            queryObject.gender=gender
        }
        if(name){
            // queryObject.name=name
            queryObject.name={$regex:name,$options:"i"}
        }

        if(fees){
            queryObject.fees=Number(fees)
        }
        
        let students = Student.find(queryObject);
        if(sort){
            console.log("sort")
            students=students.sort(sort)
        }
        else{
            console.log("no sort")
            students=students.sort("age")
        }

        if(fields){
            let splittedFields=fields.split(",").join(" ")
            students=students.select(splittedFields+" -_id")
            console.log(splittedFields)
        }

        //* This is for displaying all records instead of restricting values
        if(!page && !limit){
            students=await students
            return res.status(200).json({count:students.length, error:false,message:`students fetched successfully`,data:students})
        }

        //* Pagination Starts & below code will restricts and access only 4 records because limit method is mentioned
        let newPage=page || 1 ;
        let newLimit=limit || 4 ;
        let newSkip=(newPage-1)*4
         students = await students.skip(newSkip).limit(newLimit);
        return res.status(200).json({count:students.length, error:false,message:`students fetched successfully`,data:students})
    }
    catch(err){
    next(err)
    }
}
module.exports={
    registerStudent,
    getStudents
}