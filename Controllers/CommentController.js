const CommentModel = require("../Models/CommentModel.js");
// const mongoose = require("mongoose");

//Method For AddComment
exports.addComment = async (req,res)=>{
    try {
        const {video ,message} = req.body;
        const comment = new CommentModel({user:req.user._id,video,message});
        await comment.save();
        return res.status(201).json({
            success:true,
            message:"Comment Added Successfully",
            comment,
        })
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        error:"Error In Server"
       }) 
    }
};

//Methods for GetCommentByVideoId
exports.getCommentByVideoId = async (req,res)=>{
    try {
        const {videoId }= req.params;

        // // Validate video ID format
        // if (!mongoose.Types.ObjectId.isValid(videoId)) {
        //     return res.status(400).json({ error: 'Invalid video ID format' });
        // }

        const comments = await CommentModel.find({video:videoId}).populate("user","channelName userName profilePic createdAt");
        return res.status(200).json({
            success:true,
            comments:comments
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         success:false,
         error:"Error In Server"
        })  
    }
}