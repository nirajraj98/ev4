const {Router,response}=require("express")
const {TodoModel}=require("../models/todo.model")
require("dotenv").config()


const todoController=Router()


todoController.get("/",async(req,res)=>{
    const todo=await TodoModel.find({userId:req.body.userId})
    res.send(todo)
})

todoController.post("/create",async(req,res)=>{
    const {taskname,status,tag,userId}=req.body;
    const todo=new TodoModel({
        taskname,
        status,
        tag,
        userId
    })
    try{
       await todo.save()
        res.send({msg:"task create done"})
    }catch(err){
       res.send({msg:"something went wrong"})
       console.log(err)
    }
})

todoController.delete("/delete/:todoId",async(req,res)=>{
    const {todoId}=req.params

    const deleteTodo=await TodoModel.findByIdAndDelete({
        _id:todoId,
        userId:req.body.userId
    });
    if(deleteTodo){
        res.send({msg:"task deleted sucessfully"})
    }else{
        res.send({msg:"coudnt delete it"})
    }
})

// todoController.patch("/edit:todoId",async(req,res)=>{
// const {todoId}=req.params;
// const updateTodo=await TodoModel.findByIdAndUpdate(
//     {_id:todoId,userId:req.body.userId},req.body);
//   if(updateTodo){
//     res.send({msg:"task update"})
//   }else{
//  res.send({msg:"Somthing error"})
//   }
// });


todoController.patch("/edit/:todoId", async (req, res) => {
    const { todoId } = req.params;
  
    const updateTodo = await TodoModel.findOneAndUpdate(
      { _id: todoId, userId: req.body.userId },
      req.body
    );
    if (updateTodo) {
      res.send({ msg: "task updated" });
    } else {
      res.send({ msg: "Something went wrong" });
    }
  });


module.exports={todoController}