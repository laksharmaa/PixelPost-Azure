import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import UserPost from '../mongodb/models/userPost.js';
import Post from '../mongodb/models/post.js'; // Import the Post model

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// GET ALL POSTS FOR A SPECIFIC USER
router.route('/').get(async (req, res) => {
    try {
        console.log('Decoded User (req.auth):', req.auth); // Log decoded user info from JWT

        const userId = req.auth && req.auth.sub;  // Extract the user ID from the token

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const userPosts = await UserPost.find({ userId });  // Find posts associated with the user ID
        if (userPosts.length === 0) {
            console.log('No posts found for this user.');
        }
        res.status(200).json({ success: true, data: userPosts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ success: false, message: 'Error fetching user posts' });
    }
});

// CREATE A USER POST AND SHARE IT TO THE COMMUNITY
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const userId = req.auth.sub; // Auth0 user ID

        const photoUrl = await cloudinary.uploader.upload(photo); // Upload the photo to Cloudinary

        // Log the details
        console.log('Request Body:', req.body); // Log the request body
        console.log('User ID:', userId); // Log the user ID
        console.log('Photo URL:', photoUrl.url); // Log the uploaded photo URL

        // Save the post in the UserPost collection
        const newUserPost = await UserPost.create({
            name,
            prompt,
            photo: photoUrl.url,
            userId,
        });

        // Save the same post in the Post (community showcase) collection
        const newCommunityPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(201).json({ success: true, data: { newUserPost, newCommunityPost } });
    } catch (error) {
        console.error('Error creating user post:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE A USER POST
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.auth.sub; // Get userId from the token

        // Find and delete the post associated with the userId and the post ID
        const post = await UserPost.findOneAndDelete({ _id: id, userId });

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found or unauthorized' });
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ success: false, message: 'Error deleting post' });
    }
});

export default router;
