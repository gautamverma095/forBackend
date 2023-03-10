const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");


exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        // const { token } = req.cookies;

        let token = req.header("Authorization")

         if (!token) { 
            return res.status(403).send("Accss Denied")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }
        
        // if (!token)
        // {
        //     return res.status(401).json({
        //        message: "Please Login to access this resource"
        //     })
        // }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(verifiedToken.id)
        next()
        
    } catch (err) {
          res.status(500).json({
            message: err.message
        })
    }
}