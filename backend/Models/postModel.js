const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
        trim:true,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
})

const Post=mongoose.model("Post",postSchema);

module.exports=Post;
