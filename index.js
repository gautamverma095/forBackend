const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { taskRouter } = require("./routes/task.routes")
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
 

// routes


app.use("/users",userRouter)
app.use("/tasks",taskRouter)


const port = process.env.PORT
connection()
app.listen(port, () => {
    console.log(`listening to port ${port}`);

})


