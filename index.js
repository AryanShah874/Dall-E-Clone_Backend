require("dotenv").config();
const express=require("express");
const cors=require("cors");
const { connectDB } = require("./mongodb/connect");
const postRoutes=require("./routes/postRoutes");
const dallERoutes=require("./routes/dallERoutes");

const app=express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json({ limit: '50mb' }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dallE", dallERoutes);

app.get("/", async function(req, res){
    res.send("Hello World");
});

try {
    connectDB(process.env.MONGODB_URL_2);

    app.listen(5000, function(){
        console.log("Server started at port 5000"); 
    });

} catch (error) {
    console.log(error);   
}

