const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task:String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },

})


const TaskModel = mongoose.model("my-task",TaskSchema)


module.exports = TaskModel