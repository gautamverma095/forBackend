const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");


exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token)
        {
            return res.status(401).json({
               message: "Please Login to access this resource"
            })
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(verifiedToken.id)
        next()
        
    } catch (err) {
          res.status(500).json({
            message: err.message
        })
    }
}