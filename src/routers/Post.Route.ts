import express from 'express';
import { getFeedPosts, getUserPosts, likePost, createPost } from '../controllers/Post.Controllers';
import { verifyToken } from "../middlewares/auth";
import upload from '../utils/multer';

export default (router: express.Router) => {
    /* READ */
    router.get("/", verifyToken, getFeedPosts);
    router.get("/:userId/posts", verifyToken, getUserPosts);

    /* UPDATE */
    router.patch("/:id/like", verifyToken, likePost);
    router.post('/auth/register',  upload.single('picture'), createPost);
};