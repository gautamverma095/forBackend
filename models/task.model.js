const mongoose = require("mongoose")
const {Schema} = require("mongoose")


const taskSchema = new mongoose.Schema({
      
  
    task: {
    type: String,
    required: [true, "can't be blank"],
    },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    time: {
         type:String
     }

}, {
    timestamps:true
})


const TaskModel = mongoose.model("task", taskSchema)

module.exports = {
    TaskModel
}