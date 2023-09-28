const {Schema,model} = require('mongoose')

let addTask=new Schema({
    userId:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    }
},
{timestamps:true})

module.exports=new model("task",addTask)