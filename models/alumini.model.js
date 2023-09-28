const {Schema,model} = require('mongoose')

let aluminiSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is Mandatory"],
    // minLength: [4, "Name Should Contain Atleast 4 Characters"],
    minLength: [1, "Name Should Contain Atleast 4 Characters"],
    maxLength: [10, "Name Should Contain Only 10 Characters"],
  },
  yop: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    // enum: {
    //   values: ["male", "female", "others"],
    //   message: "Only male,female,other allowed and you entered {VALUE}",
    // },
  },
  department: {
    type: String,
    required: true,
  },
  // profile: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  mobile:{
    type:Number,
    required:true
  }
});

module.exports=new model("alumini",aluminiSchema)