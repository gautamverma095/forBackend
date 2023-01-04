const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const saltRounds = 8

// user register
exports.register = async (req, res, next) => {
    

    try {
        const { name, userName, email, password, confirmPassword } = req.body
       
        const user = await UserModel.findOne({ userName: userName, email: email })
        if (user)
        {
          
             return res.status(400).json({
                 err: "User already exists",
                 
             })
            
            }
        
        if (password != confirmPassword)
        
        {
            return res.status(400).json({
                message: "Password and confirmPassword did not matched"
            })
        }

        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(password, salt)

        
        const newUser = new UserModel({
            name,
            email,
            userName,
           password: hashPassword,
        })
 
        const savedUser = await newUser.save()
      
        savedUser.password = ""
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET)
        savedUser.password = ""

    // options for cookie
        
        res.status(201).cookie("token",token).json({
            success:true,
            savedUser,
            token
        })

        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}


// user login

exports.login = async (req, res, next) => {
    const { userName,email, password } = req.body
    // const user = await UserModel.findOne({ email: email}).select('+password')
    const user = await UserModel.findOne({ userName: userName}).select('+password')
    try {
        if (!user) {
         
          return  res.status(400).send("User does not exist")
        }

        const isMatchPassword = await bcrypt.compare(password, user.password)
        
        if (!isMatchPassword) {
            
             return res.status(401).send("Invalid Credentials")
        }

        
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
        
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    user.password = ""

    // options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
    
    res.status(200).cookie("token",token,options).json({
        success: true,
        token,
        user
    })
    
}


// user logout
exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })
     res.status(200).json({
    success: true,
    message: "Logged Out",
  });
}