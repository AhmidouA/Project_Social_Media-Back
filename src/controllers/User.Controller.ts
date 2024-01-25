/* Npm */
import express from "express";


/* Component */
import prisma from '../config/db.config';
import { ReadUserType, friendsType } from 'shared/usersTypes';

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;;
        const user: ReadUserType = await prisma.user.findUnique({
            where: {id: parseInt(id)}
        });

        if (!user) return res.json({ status: 404, message: "User Not Found" });
        return res.json({status: 200, user})
    } catch (error) {
        console.error("getUser Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }    
};

export const getUserFriends = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const user  = await prisma.user.findUnique({
            where: {id: parseInt(id)}
        })

        if (!user) return res.status(404).json({ status: 404, message: "User not found" });
        
        const friends = await Promise.all(
            user.friends.map((id) => prisma.user.findUnique({where: {id: parseInt(id)}}))
        )
        const formattedFriends = await friends.map(
            ({id, firstName, lastName, location, occupation, picturePath} : friendsType) => {
                return {id, firstName, lastName, location, occupation, picturePath}; 
            }
        )

        return res.json({status: 200, formattedFriends})
    } catch (error) {
        console.error("getUserFriends Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };  
};

export const addRemoveFriend = async (req: express.Request, res: express.Response) => {
    try {
        const {id, friendId } = req.params;

        const user = await prisma.user.findUnique({
            where: {id : parseInt(id)}
        });
        const friend = await prisma.user.findUnique({
            where: { id: parseInt(friendId) }
        });

        if(user.friends.includes(friendId)) {
            // Supprimer l'ami de la liste
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => parseInt(id) !== user.id);
        } else {
            // Ajouter l'ami à la liste
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // Mettre à jour la liste d'amis de l'utilisateur principal
        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { friends: user.friends }
        });

        // Mettre à jour la liste d'amis de l'ami
        await prisma.user.update({
            where: { id: parseInt(friendId) },
            data: { friends: friend.friends }
        });

        const friends = await Promise.all(
            user.friends.map((id) => prisma.user.findUnique({where: {id: parseInt(id)}}))
        )
        const formattedFriends = await friends.map(
            ({id, firstName, lastName, location, occupation, picturePath} : friendsType) => {
                return {id, firstName, lastName, location, occupation, picturePath}; 
            }
        )

        return res.json({ status: 200, formattedFriends });
        
    } catch (error) {
        console.error("addRemoveFriend Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    };
}