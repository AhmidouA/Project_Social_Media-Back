import express from 'express';
import { register, login } from '../services/auth';
import upload from '../utils/multer';

export default (router: express.Router) => {
    router.post('/auth/register',  upload.single('picture'), register);
    router.post('/auth/login', login);
};