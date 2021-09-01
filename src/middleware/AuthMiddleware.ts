import jwt, { decode } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import { UserSchema } from "../models/UserModel";

const User = mongoose.model("user", UserSchema)

export class AuthMiddleware {
    public authenticateToken(req: Request, res: Response, next: NextFunction) {

        let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["cookie"];
        if (!token) {
            return res.status(403).json({ "message": "A token is required for authentication" });
        }
        try {
            token = token.split("=")[1]
            let flag = false
            jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, verifiedToken: any)=>{
                if (verifiedToken.user_id == undefined || verifiedToken.role == undefined || verifiedToken.status == undefined) {
                    flag = true
                    return
                }
    
                if (verifiedToken.role != 1) {
                    if (verifiedToken.status != "accepted") {
                        flag = true
                        return
                        
                    }
                }
            })
            
            if(flag){
                return res.status(401).json({ "message": "user account is pending for acceptance" });
            }
            
        } catch (err) {
            return res.status(401).json({ "message": "Invalid Token" });
        }
        return next();
    }

    public authenticateTokenForAdmin(req: Request, res: Response, next: NextFunction) {
        let token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["cookie"];
        if (!token) {
            return res.status(403).json({ "message": "A token is required for authentication" });
        }
        try {
            let flag = false
            token = token.split("=")[1]
            jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, verifiedToken: any) => {

                if (err) {
                    flag = true 
                    return
                }
                if (verifiedToken.user_id == undefined || verifiedToken.role == undefined || verifiedToken.status == undefined) {
                    flag = true
                    return
                }

                if (verifiedToken.role != 1) {
                    flag = true
                    return
                }
            });

            if(flag){
                return res.status(401).json({ "message": "only admin authorized" })
            }

        } catch (err) {
            return res.status(401).json({ "message": "Invalid Token" });
        }
        return next();
    }
}