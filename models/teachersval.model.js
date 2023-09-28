const {Schema,model} = require('mongoose')
const bcryptjs = require("bcryptjs");

let teachersValidation = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is mandatory"],
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
    },
    password: {
      type: String,
      required: [true, "password is mandatory"],
    },
    otp:{
      type:String,
      required:[true,"otp is mandatory"],
      default:null
     
    }
  },
  { timestamps: true }
);

teachersValidation.pre("save", async function(){
      let salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
})

teachersValidation.methods.compareMyPassword=async function(password){
        let hashedPassword=await bcryptjs.compare(password,this.password)
        return hashedPassword;
}

// teachersValidation.pre("save", async function () {
//   let salt = await bcryptjs.genSalt(10);
//   this.otp = await bcryptjs.hash(this.otp, salt);
// });

module.exports=new model("teavhersvalidation",teachersValidation)