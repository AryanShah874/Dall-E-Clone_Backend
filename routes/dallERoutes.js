require("dotenv").config();
const express=require("express");
const { Configuration, OpenAIApi }=require("openai");

const router=express.Router();

const configuration=new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai=new OpenAIApi(configuration);

router.get("/", function(req, res){
    res.send("Hello from DALL_E")
});

router.post("/", async function(req, res){
    try {
        const {prompt} =req.body;
        
        const aiResponse=await openai.createImage({
            prompt: prompt, 
            n: 1, 
            size: "1024x1024",
            response_format: "b64_json"
        });

        const image=aiResponse.data.data[0].b64_json;

        res.status(200).json({photo: image});

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

module.exports=router;

