const {Schema,model} = require('mongoose')

//* A mongoose schema defines the structure of documents inside a particular collection.
let employeeSchema = new Schema(
  {
    empId: {
      type: Number,
      required: [true, "Employee id is mandatory"],
      min: [7230, "Minimum Id number should be 4 but you entered {VALUE}"],
      max: [7250, "Maximum Id number should be 4 but you entered {VALUE}"],
      unique:true
    },
    empName: {
      type: String,
      required: [true, "Name is mandatory"],
      minLength: [4, "Name should contains atleast 4 characters"],
      maxLength: [18,"Name should contain only less than or equal to 18 characters"]
    },
    empSalary: {
      type: Number,
      required: [true,"Employee salary should be mandatory"],
      min:[20000,"Employee basic salary should be 20000 but you entered {VALUE}"]
    }
  },
  { timestamps: true }
);

module.exports=new model("employee",employeeSchema)