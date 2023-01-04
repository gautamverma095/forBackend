


// create task

const { TaskModel } = require("../models/task.model")

exports.createTasks = async (req, res, next) => {
    console.log(req.body);

    try { 
        const { task } = req.body

        const { _id } = req.user

        const time = new Date()
      
        
        const newTask = new TaskModel({
            task,
            userId: _id,
            time
        })
        const savedTask = await newTask.save()
         res.status(201).json({
            savedTask
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message
            
        })
        
    }
    
}


// get all tasks

exports.getTasks = async (req, res, next) => {
    // console.log(req.user);

    const { _id } = req.user

 
    
    const tasks = await TaskModel.find({ userId: { $in: [{ _id }] } }).populate("userId")
    

    res.status(200).json(
        tasks
    )
}