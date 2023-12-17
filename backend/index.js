const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//importing the taskmodel form model file
const TaskModel = require('./Models/task')

const app = express()

//use cors in oreder to connect the backend with frontend
app.use(cors())

//used to parse json data sent to the request body
app.use(express.json())

//connecting with the mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/my-task')

//get all records
app.get('/records',(req,res)=>{
    TaskModel.find()
    .then(result=> res.json(result))
    .catch(err=>console.log(err))
})

//get status updated
app.put('/status/:id',(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    TaskModel.findByIdAndUpdate({_id: id},{status:true})
    .then(result => res.json(result))
    .catch(err=> res.json(err))
})

//add data
app.post('/add',(req,res)=>{
    const {task,description} = req.body;
    TaskModel.create({
        task:task,
        description:description,
    }).then(result=> res.json(result))
    .catch(err=>res.json(err));
})


//edit the task 
app.put('/edit/:id',async(req,res)=>{
    const {id}= req.params;
    const{task,description} = req.body;
    TaskModel.findByIdAndUpdate(id,{task,description}).then((result)=>{
        
        res.send("updated successfully")
    }).catch((err)=> console.log(err));


})

//delete task
app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    TaskModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

//creating a port having port 8080
app.listen(8080,()=>{
    console.log("server is running");
})