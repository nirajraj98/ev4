const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    userId:{type:String,require:true},
    taskname:{type:String, require:true},
    status:{type:String, require:true},
    tag:{type:String, require:true},
})

const TodoModel=mongoose.model("todo",todoSchema)
module.exports={TodoModel}