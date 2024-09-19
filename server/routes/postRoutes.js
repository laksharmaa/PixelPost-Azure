import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//GET ALL POSTS
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({}); // Fetch all posts from the database
        
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error('Error fetching posts:', error); // Log the error in the server console
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
});

//CREATE A POST
router.route('/').post(async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const { name, prompt, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("Uploaded photo URL:", photoUrl.url); // Log the uploaded photo URL

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error creating post:", error); // Log any error
        res.status(500).json({ success: false, message: error });
    }
});

export default router;