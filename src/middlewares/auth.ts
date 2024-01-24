import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken =async (req: express.Request, res: express.Response, next: NextFunction ) => {
    try {
        let token = req.header("Authorization");
        if(!token) return res.json({status: 403,message: "Access Denied."});

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        console.log("token VerifyToken", token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verified VerifyToken", verified);

        next();        
    } catch (error) {
        console.error("Error verifyToken:", error);
        res.status(401).json({ Message: "Token d'authentification invalide" });
    };
};