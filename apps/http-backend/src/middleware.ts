import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWT_SECRET} from '@repo/backend-common/config';
declare global {
    namespace Express {
        interface Request {
            userId?:string;
        }
    }
}

export function middleware(req:Request,res:Response,next:NextFunction){

    const token = req.headers['authorization'];

    const decoded = jwt.verify(token as string,JWT_SECRET);

    if (typeof decoded === 'object' && 'userId' in decoded){
        req.userId = (decoded as JwtPayload).userId as string;
    }
    else{
        res.status(403).json({message:"unauthorized access"})
    }
}