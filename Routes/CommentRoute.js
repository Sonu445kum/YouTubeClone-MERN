const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/CommentController.js");
const auth = require("../Middleware/Authentications.js");
// Routes;
router.post("/addComment",auth,CommentController.addComment);
router.get("/Comment/:videoId",CommentController.getCommentByVideoId);




//Export the Router here
module.exports = router;
