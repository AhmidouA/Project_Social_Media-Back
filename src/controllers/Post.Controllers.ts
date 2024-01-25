/* Npm */
import express from "express";


/* Component */
import prisma from '../config/db.config';
import { PostType, createPostType } from 'shared/postsTypes';

export const createPost = async (req: express.Request, res: express.Response) => {
    try {
        const { userId, description, picturePath }: createPostType = req.body; 
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, firstName: true, lastName: true, location: true, picturePath: true },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        const newPost = await prisma.post.create({
            data: {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                friends: [], 
              },
        })

        const posts = await prisma.post.findMany();
        return res.status(201).json(posts);     
    } catch (error) {
        console.error("createPost Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };
};

export const getFeedPosts = async (req: express.Request, res: express.Response) => {
    try {
        const posts = await prisma.post.findMany();
        return res.status(201).json(posts)
    } catch (error) {
        console.error("getFeedPosts Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };
};

export const getUserPosts = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.params;
        const posts = await prisma.post.findMany({
            where: {
                userId: parseInt(userId)
            }
        });
        
        return res.status(201).json(posts)
    } catch (error) {
        console.error("getUserPosts Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };
};


export const likePost = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await prisma.post.findUnique({
            where: {id: parseInt(id)},
            select: {likes: true}
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Vérifier si l'utilisateur a déjà aimé le post
        const isLiked = (post.likes as any[]).some((like) => like.userId === userId);

        // Mettre à jour les likes en conséquence
        if (isLiked) {
        // Supprimer le like de l'utilisateur
        post.likes = (post.likes as any[]).filter((like) => like.userId !== userId);
        } else {
        // Ajouter le like de l'utilisateur
        post.likes = [...(post.likes as any[]), { userId }];
        }

        // Mettre à jour le post avec les likes mis à jour
        const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { likes: post.likes },
        select: { likes: true },// Si vous voulez inclure les likes dans la réponse
        });
      
        return res.status(201).json(updatedPost)
    } catch (error) {
        console.error("likePost Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };
}

