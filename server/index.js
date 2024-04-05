import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controller/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controller/posts.js";import User from "./models/User.js";
import { firebaseStorage } from "./firebaseAdmin.js";

/* Configurations*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin:["https://social-circle-frontend-snowy.vercel.app"],
    methods:["POST","GET","PATCH"],
    credential:true
}
));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const Storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage: Storage });
/*Routes With Files*/


//Register file upload Function
export const  uploadPicture = async (req, res, next) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: "No files were uploaded." });
      }

      const bucket = firebaseStorage;
      const file = bucket.file(req.file.originalname);

      const metadata = {
          metadata: {
              contentType: req.file.mimetype,
          },
      };

      await file.save(req.file.buffer, metadata);

      const [url] = await file.getSignedUrl({
          action: "read",
          expires: "01-01-2100",
      });

      const picturepath = url;
      req.picturepath = picturepath;

      // Call the register function passing the picture path
      next(); 
      console.log("Upload picture middleware executed");


  } catch (error) {
      console.error("Error uploading file to Firebase Storage:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

//Post file Function
 export const uploadPostPicture = async (req, res, next) => {
  try {
    if (!req.file) {
      // If no file is uploaded, simply proceed to the next middleware
      next();
      return;
    }

    const bucket = firebaseStorage;
    const file = bucket.file(req.file.originalname);

    const metadata = {
      metadata: {
        contentType: req.file.mimetype,
      },
    };

    await file.save(req.file.buffer, metadata);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2100",
    });

    // Store the picture path in req.body if a file is uploaded
    req.body.picture = url;

    console.log("Picture uploaded successfully");

    next(); // Move to the next middleware
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


app.post(
  "/auth/register",
  upload.single("picture"),
  uploadPicture, // Using uploadPicture middleware here
  (req, res, next) => {
    // Access picturepath from request object and pass it to the register function
    register(req, res, req.picturepath);
  }
  
);

app.post(
  "/posts",
  upload.single("picture"),
  async (req, res, next) => {
    try {
      // Call the uploadPostPicture middleware to handle picture upload
      uploadPostPicture(req, res, async () => {
        // After picture is uploaded (or not), proceed with creating the post
        await createPost(req, res, req.body.picturepath);
      });
    } catch (error) {
      console.error("Error processing post creation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


/*Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Started`));
  })
  .catch((error) => console.log(`${error} did not connect`));
