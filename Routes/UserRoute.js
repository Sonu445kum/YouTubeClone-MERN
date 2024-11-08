const express= require("express");
const router=express.Router();
const UserController= require("../Controllers/UserController.js")


router.post("/signUp",UserController.signUp);
router.post("/login",UserController.signIn);
router.post("/logout",UserController.logout);





// exports router
module.exports=router;