const {Schema,model} = require('mongoose')

let multiplefileSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is Mandatory"],
    // minLength: [4, "Name Should Contain Atleast 4 Characters"],
    minLength: [1, "Name Should Contain Atleast 4 Characters"],
    maxLength: [10, "Name Should Contain Only 10 Characters"],
  },
    email: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  pdfFiles: {
    type: String,
    required: true,
  }

},
{timestamps:true});

module.exports=new model("multiplefile",multiplefileSchema)