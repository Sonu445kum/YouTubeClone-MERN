const VideoModel = require("../Models/VideoModel.js");
const mongoose = require("mongoose")
// Methods For VideoUpload
exports.videoUpload = async (req,res)=>{
   try {
    const {title,description,videoLink,thumbnail,videoType} = req.body;

    // validation
    if(!title || !description || !videoLink || !thumbnail ||!videoType){
        return res.status(400).json({
            message:"Please fill all the fields"
        })
    }
        const videoUpload = new VideoModel({user:req.user._id,title,description,videoLink,thumbnail,videoType});
        await videoUpload.save();

        res.status(201).json({
            success:true,
            message:"Video uploaded successfully",
            videoUpload,
        })
    
   } catch (error) {
    console.log(error);
    return  res.status(500).json({
        success:false,
        error:"Server Error"
    })
   }
}

// Methods For GetAllVideos
exports.getAllVideos = async (req,res)=>{
    try {
        const AllVideos = await VideoModel.find().populate("user","channelName userName profilePic createdAt");
        return res.status(201).json({
            success:true,
            message:"Receive AllVideo Successfully..!!",
            AllVideos,
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            success:false,
            error:"Server Error"
        }) 
    }
};

//Method For GetVideoById
exports.getVideoById = async ( req,res)=>{
    // Validate ObjectId
    
//    if (!mongoose.Types.ObjectId.isValid(videoId)) {
//          return res.status(400).json({ error: 'Invalid video ID format'});
//     } 
        try {
            const {videoId }= req.params;
            // if (!mongoose.Types.ObjectId.isValid(videoId)) {
            //     return res.status(400).json({ error: 'Invalid video ID format'});
            // }
            const video = await VideoModel.findById(videoId).populate("user","channelName userName profilePic createdAt");
            if(!video){
                return res.status(404).json({
                    success:false,
                    message:"Video Not Found"
                    })
                }
                return res.status(201).json({
                    success:true,
                    message:"Video Found Successfully..!!",
                    video,
                    })
            
        } catch (error) {
            console.log(error);
            return  res.status(500).json({
                success:false,
                error:"Server Error"
            }) 
        }
};

//Method for getVideoByUserId:
exports.getVideoByUserId = async (req,res)=>{
   
    // // Check if userId is provided and is a valid ObjectId
    

    try {
        const {userId}= req.params;
        // if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({ error: 'Invalid or missing user ID' });
        // }
        const video = await VideoModel.find({user:userId}).populate("user","channelName userName profilePic createdAt about");
        if(!video){
            return res.status(404).json({
                success:false,
                message:"Video Not Found"
                })
        }
        return res.status(201).json({
            success:true,
            message:"UserVideo Found Successfully..!!",
            video,
        })

    } catch (error) {
        console.log(error);
            return  res.status(500).json({
                success:false,
                error:"Server Error"
            }) 
    }
};