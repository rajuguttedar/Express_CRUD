const express = require('express')
const { addAlumini, getAlumini, addAluminiFromExcel, addDataToExcel, addAluminimultiplefiles } = require('../controller/alumini.controller')
const multer = require("multer");
let router=express.Router()



//* excel upload and image upload code starts
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

let upload = multer({ storage: storage });
//* excel upload and image upload code ends

router.post("/addalumini",upload.single("profile"),addAlumini)
router.get("/getalumini",getAlumini)
// router.post("/readfromexcelandsavetodatabase",upload.single("excel"),readFromExcelAndSaveToDataBase)
router.post("/addexcelalumini", upload.single("excel"), addAluminiFromExcel);
router.post("/adddatatoexcel", upload.single("toexcel"),addDataToExcel)




//* upload multiple files starts
const multipleFile = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

let uploadfiles = multer({ storage: multipleFile }).fields([
  { name: 'image', maxCount: 1 }, // for the image file
  { name: 'pdf', maxCount: 1 }    // for the PDF file
]);

router.post("/addaluminifiles", uploadfiles, addAluminimultiplefiles);
//* upload multiple files ends


module.exports=router