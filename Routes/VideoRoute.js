const express = require("express");
const router  = express.Router();
const VideoController = require("../Controllers/VideoController.js");
const auth = require("../Middleware/Authentications.js");


// Routes
router.post("/videoUpload", auth , VideoController.videoUpload);
router.get("/allVideos",VideoController.getAllVideos);
router.get("/getVideoId/:videoId", VideoController.getVideoById);
router.get("/:userId/channel",VideoController.getVideoByUserId);

// Export Router
module.exports = router;