const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

exports.isAuthenticated = async (req, res, next)=>{
    try {
        const {token} = req.cookies;

        //   IF NO TOKEN IS THERE i.e NOT LOGGED IN...
        if(!token){
            return res.status(400).json({
                message:"Please log in first"
            })
        }

        // VERIFYING THE TOKEN WITH USER WITH JWT...
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //   FINDING THE USER AND SETTING IT IN "req.user"
        req.user = await User.findById(decoded._id);
        // FOR WORKING THE NEXT FUNCTIONS...
        next();

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}