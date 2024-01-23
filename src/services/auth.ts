/* Npm */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from "express";

/* Component */
import prisma from '../config/db.config';
import { createUserType, loginType } from 'shared/usersTypes';


export const register = async (req:express.Request, res: express.Response) => {
    try {
        const {firstName, lastName, email, password, picturePath, friends, location, occupation }: createUserType = req.body;

        if (!firstName || !lastName || !email || !password ) 
            return res.json({status: 400,message: "Please complete all fields."});

        const findUser = await prisma.user.findUnique({
            where: {email}
        });

        if (findUser) return res.json({status: 400,message: "Email Already Taken, Please choose another email."});

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
        res.json({token, user})
        
    } catch (error) {
        console.error("Error login_register:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    
}