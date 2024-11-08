const UserModel = require("../Models/UserModel.js");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

// create Object to set in cookie method
const cookiesOptions={
    httpOnly: true,      // Prevents JavaScript access to the cookie (important for security)
    secure: true,        // Send cookie only over HTTPS (set to false for local development)
    sameSite: 'strict',  // Prevents cross-site request forgery
    maxAge: 24 * 60 * 60 * 1000 // Set expiry (here: 24 hours in milliseconds)
};
// Method For SignUp
exports.signUp = async(req,res)=>{
    try {
        const {channelName,userName,about,profilePic,password} = req.body;

        //validation for Fields
        if(!userName || !channelName || !about || !profilePic || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        // Check User is Exists or Not
        const isExist= await UserModel.findOne({userName});
        if(isExist){
            return res.status(400).json({
                success:false,
                message:"User Already Exist",
            })
        }else{
            //Hashing Password
            const updatePassword = await bcrypt.hash(password,10);

            // Save All Details In User:
            const User= new UserModel({channelName,userName,about,profilePic,password:updatePassword});
             await User.save();
             return res.status(200).json({
                success:true,
                message:"User Created Successfully",
                data:User,
            })
        }
    } catch (error) {
        res.status(500).json({error:"Server Error"});
        console.log(error);
    }
}

//Method For SignIn 
exports.signIn = async(req,res)=>{
    try {
        const {userName,password} = req.body;

        // Check User is Exists or Not
        const user=await UserModel.findOne({userName});

        // compare password
        const isMatch = await bcrypt.compare(password,user.password);

        // Validate UserName And Password
        if(user && isMatch){
        // token Method
        const token = jwt.sign({userId:user._id},"Its_My_Secret_Key");
        // Set Token Into Cookie
        res.cookie("token",token,cookiesOptions);
            return res.status(200).json({
                success:true,
                message:"User Login Successfully",
                token:token,
                user,
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials",
            })
        }
        
    }catch (error){
        console.log(error);
        return res.status(500).json({
            error:"Server Error",
           
        })
    }
}

// Methods For Logout
exports.logout = async (req,res)=>{
    res.clearCookie('token',cookiesOptions).json({
        success:true,
        message:"User Logout Successfully",
        
    });
    

}