const postModel=require("../Models/postModel")

const addPost=async(req,res)=>{
    try {
       const {title,content} =req.body;
       const newPost=await postModel.create({
        title:title,
        content:content,
        createdBy:req.user.id
       })
       res.status(201).json({message:"Post created successfully",newPost})
    } catch (error) {
        console.log("error while creating post",error);
        return res.status(400).json({
            message: "Error while creating post"
        })
    }
}

const allPost=async(req,res)=>{
    try {
        const allPosts=await postModel.find({});
        return res.status(200).json({
            message:"Fetched all posts",
            allPosts
        })
    } catch (error) {
        console.log("error in getting all post",error);
        return res.status(400).json({
            message:"cannot fetched all post"
        })
    }
}

const updatePost=async(req,res)=>{
    try {
        const {title,content}=req.body;
        const updatedPost=await postModel.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });

        res.json(updatedPost);
    } catch (error) {
        console.log("error while updating post",error);
        return res.status(400).json({
            message:"error in updating post"
        })
    }
}

const deletePost=async(req,res)=>{
    try {
        const deletedPost = await postModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted successfully" });  
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
}
module.exports={addPost,allPost,updatePost,deletePost}