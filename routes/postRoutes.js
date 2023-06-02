require("dotenv").config();
const express=require("express");
const cloudinary=require("cloudinary");
const Post=require("../mongodb/post")  //very very important how to export models

const router=express.Router();

cloudinary.config({
    cloud_name: "dmamth1y2",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", async function(req, res){
    try {
        const posts=await Post.find({});
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
});

router.post("/", async function(req, res){

    try {
        const {name, prompt, photo}=req.body;

        const photoUrl=await cloudinary.v2.uploader.upload(photo);

        const newPost=new Post({
            name: name, 
            prompt: prompt,
            photo: photoUrl.url //not directly stored as base_64 address instead firsrt the image is stored in cloudinary and this its url is stored in the database
        });

        newPost.save();
    
        res.status(201).json({success: true, data: newPost});
        
    } catch (error) {
        res.status(500).json({success: false, message: error});   
    }
});

module.exports=router;