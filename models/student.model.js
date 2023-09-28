const {Schema,model} = require('mongoose')

let studentSchema=new Schema({
    name:{
        type:String,
        required:[true,"student name is mandatory"],
        minLength:[4,"name must be atleast 4 characters"]
    },
    age:{
        type:Number,
        required:[true,"age is mandatory"],
        min:[18,"minimum age is 18 but you entered {VALUE}"],
        max:[36,"maximum age is 36 but you entered {VALUE}"]
    },
    gender:{
        type:String,
        required:[true,"gender is mandatory"],
        enum:["male","female","other"]
    },
    fees:{
        type:Number,
        required:true
    },
    marks:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=new model("student",studentSchema)