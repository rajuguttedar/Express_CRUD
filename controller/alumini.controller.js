const  Alumini= require('../models/alumini.model')
let Multiplefiles=require('../models/multilefiles.model')
const {StatusCodes:{CREATED,OK,CONFLICT}} = require('http-status-codes')
// Requiring the module
const reader = require('xlsx')

//* add alumini with single file
let addAlumini=async(req,res,next)=>{
    try{
        let {name,yop,gender,department,profile}=req.body

               console.log(req.file)

        //* altering the path of file and storing in db
        let port="http://localhost:4500"
        // let path=req.file.path.replace("public","");
        let path=req.file.path.split("public")[1];
        console.log(path)
        let imagePath=port+path
        console.log(imagePath)

        //* altering the path of file and storing in db

        let alumini=await Alumini.create({name,yop,gender,department, profile:imagePath})

        res.status(CREATED).json({error:false,message:"Alumini Added Successfully",data:alumini})
    }
    catch(err){
        next(err)
    }
}

//* add alumini with multiple files
let addAluminimultiplefiles = async (req, res, next) => {
  try {
    const { name, email,profileImage ,pdfFiles} = req.body;

    // console.log(req.files); // This will log the uploaded files

    const imageFile = req.files['image'][0];
    const pdfFile = req.files['pdf'][0];

    const imagePath = 'http://localhost:4500' + imageFile.path.split('public')[1];
    const pdfPath = 'http://localhost:4500' + pdfFile.path.split('public')[1];


    let alumini = await Multiplefiles.create({name, email, profileImage: imagePath, pdfFiles: pdfPath});

    return res.status(CREATED).json({count:alumini.length, error: false, message: "Alumini files Added Successfully", data: alumini});
  } catch (err) {
    next(err);
  }
}

let getAlumini=async(req,res,next)=>{
    try{
        let getProfile=await Alumini.find({});
        return res
          .status(OK)
          .json({
            count: Alumini.length,
            error: false,
            message: "fetched alumini",
            data: getProfile,
          });
    }
    catch(err){
        next(err)
    }
}

//* Reading data from excel
let addAluminiFromExcel = async (req, res, next) => {
  try {
    // Reading our test file
    // let {email,mobile}=req.body
    //     let isAvailable=await Alumini.findOne({email,mobile})
    //     if(isAvailable){
    //         return res.status(CONFLICT).json({error:true,message:`The given email ${email} & mobile number ${mobile} of Alumini is already exists`})
    //     }
    const file = reader.readFile("./public/uploads/MOCK_DATA.xlsx");

    let data = [];

    const sheets = file.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }

 
    // Printing data
    // console.log(data);
    let aluminis = await Alumini.insertMany(data);
    res
      .status(201)
      .json({
        error: false,
        message: "Excel Added Successfully",
        data: aluminis,
      });
  } catch (err) {
    next(err);
  }
};

//* read the data from database and write it to excel
let addDataToExcel=async(req,res,next)=>{
  try{
    // Requiring module
    // const reader = require("xlsx");

    // Reading our test file
    const file = reader.readFile("./public/uploads/MOCK_DATA.xlsx");

    // Sample data set
    let student_data = [
      {
        Student: "Nikhil",
        Age: 22,
        Branch: "ISE",
        Marks: 70,
      },
      {
        Student: "Amitha",
        Age: 21,
        Branch: "EC",
        Marks: 80,
      },
    ];

    const ws = reader.utils.json_to_sheet(student_data);

    reader.utils.book_append_sheet(file, ws, "Sheet3");

    // Writing to our file
    reader.writeFile(file, "./public/uploads/test.xlsx");
  }
  catch(err){
    next(err)
  }
}
module.exports={
    addAlumini,
    addAluminimultiplefiles,
    getAlumini,
    addAluminiFromExcel,
    addDataToExcel
}