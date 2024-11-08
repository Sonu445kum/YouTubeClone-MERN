const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel.js");
// Authentication 

const auth = async(req,res,next)=>{
    // const token = req.cookie.token;

    const token = req.headers.authorization?.split(' ')[1] || 
                req.body.token || 
                req.cookies?.token || 
                req.query.token;


    if(!token){
        return res.status(401).json({
            success:false,
            message:"Authentication Denies due  to No Token..!!"
        })
    }else{
        try {
            const decode =  jwt.verify(token,"Its_My_Secret_Key");
            req.user= await UserModel.findById(decode.userId).select("-password");
            next();
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                error:"Not A Valid Token"
            })
        }
    }
}
//export
module.exports = auth;