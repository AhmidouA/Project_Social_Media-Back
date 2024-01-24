/* Npm */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from "express";
import { body, validationResult } from 'express-validator';

/* Component */
import prisma from '../config/db.config';
import { createUserType, loginType } from 'shared/usersTypes';



export const register = async (req:express.Request, res: express.Response) => {
    try {

        
        await body('firstName').isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters.').run(req);
        await body('lastName').isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters.').run(req);
        await body('email').isEmail().withMessage('Invalid email address.').run(req);
        await body('password').isLength({ min: 4 }).withMessage('Password must be at least 5 characters.').run(req);
        await body('confirmPassword').isLength({ min: 4 }).withMessage('confirm Password must be at least 5 characters And same Password.').run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {firstName, lastName, email, password, confirmPassword, picturePath, friends, location, occupation }: createUserType = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword ) 
            return res.json({status: 400,message: "Please complete all fields."});

        const findUser = await prisma.user.findUnique({
            where: {email}
        });

        if (findUser) return res.json({status: 400,message: "Email Already Taken, Please choose another email."});
        if (password !== confirmPassword) return  res.json({status: 400, message: 'Password and confirmation does not match'})

        const hasedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hasedPassword,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000),
            }
        })
        
        return res.json({status: 200, data: newUser, message: 'User created.'})   
    } catch (error) {
        console.error("Error Auth_register:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }   
};

export const login =async (req:express.Request, res: express.Response) => {
    try {

        await body('email').isEmail().run(req);
        await body('password').notEmpty().run(req);
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        
        const { email, password }: loginType = req.body;
        if (!email)return res.json({status: 400,message: "complete the email. "});
        if (!password) return res.json({status: 400,message: "complete the password. "});


        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(!user) return res.json({status: 400,message: "User does not exist. "})

        console.log("userPassword", user)

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({status: 400, message: 'Invalid Password'}) 

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "2h"})
       
        
        console.log("{ TOKEN login}>>>>>>", token);

        delete user.password;

        // Mettre en place une fois le code deployé
        // res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // 2 heures en millisecondes
        res.json({token, user})
        
    } catch (error) {
        console.error("Error login_register:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }  
};

export const logout =async (req: express.Request, res: express.Response) => {
    try {
        res.clearCookie('token')
        
    } catch (error) {
        console.error('Erreur logout :', error);
        return res.status(500).json({ status: 500, message: 'Erreur interne du serveur' });
    };
};