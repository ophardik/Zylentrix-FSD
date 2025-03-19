const express=require("express");
const { addPost, allPost, updatePost, deletePost } = require("../Controllers/postController");
const authMiddleware = require("../Middleware/auth");
const router=express.Router();

router.post("/addPost",authMiddleware,addPost);
router.get("/allPost",allPost);
router.put("/updatePost/:id",authMiddleware,updatePost);
router.delete("/deletePost/:id",authMiddleware,deletePost)

module.exports=router