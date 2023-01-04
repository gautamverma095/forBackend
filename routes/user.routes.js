const express = require("express")
const { register, login, logout } = require("../controllers/user.controller")

const userRouter = express.Router()

// for user register
userRouter.post("/register", register)


// for user login
userRouter.post("/login", login)

// for user logout
userRouter.get("/logout",logout)


module.exports = {
    userRouter
}