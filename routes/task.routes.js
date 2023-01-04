const express = require("express")
const { createTasks, getTasks } = require("../controllers/task.controller")
const { isAuthenticatedUser } = require("../middlewares/authentication")

const taskRouter = express.Router()


// create tasks
taskRouter.post("/create",isAuthenticatedUser, createTasks)

// get all tasks
taskRouter.get("/alltasks",isAuthenticatedUser, getTasks)

module.exports = {
    taskRouter
}