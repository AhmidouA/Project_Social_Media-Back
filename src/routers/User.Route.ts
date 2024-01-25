import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/User.Controller';
import { verifyToken } from "../middlewares/auth";

export default (router: express.Router) => {
    /* READ */
    router.get('/user/:id', verifyToken, getUser);
    router.get('/user/:id/friends', verifyToken, getUserFriends);

    /* UPDATE */
    router.patch('user/:id/:friendId', verifyToken,addRemoveFriend);
};