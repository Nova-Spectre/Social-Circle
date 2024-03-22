import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet  from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controller/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import verifyToken from "./middleware/auth.js";
import { createPost } from "./controller/posts.js";
import User from "./models/User.js"
import Post from "./models/Post.js"
import {users , posts } from "./data/index.js";



/* Configurations*/
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
dotenv.config();
const app=express();


app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors({
    origin: ["https://social-circle-frontend-snowy.vercel.app"],
    methods: ["POST", "GET", "PATCH"],
    credentials: true,
}
));
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

/* File Storage */

const Storage=multer.diskStorage({
    destination:function(req, file , cb){
        cb(null,"public/assets");

    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({Storage});

/*Routes With Files*/

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken ,upload.single("picture"),createPost);

/*Routes */
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes)


/*MONGOOSE SETUP */
const PORT=process.env.PORT || 6001;
const fallbackMongoURI = 'mongodb+srv://dummyuser:dummyuser@cluster0.siyqlgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log("MongoDB URI:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL || fallbackMongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));






