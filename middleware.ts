import jwt from "jsonwebtoken";
import type { Request,Response, NextFunction } from "express";
type JwtPayload = {
    userId: string;
    role: string;
};
export function isAuthenticated(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ success: false, error: "Unauthorized, token missing or invalid" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'DEFAULT_SECRET_KEY') as JwtPayload;
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    }catch (error) {
        res.status(401).json({ success: false, error: "Unauthorized, token missing or invalid" });
        return;
    }
}

export function isTeacher(req:Request,res:Response,next:NextFunction){
    if(req.role !== 'teacher'){
        res.status(403).json({ success: false, error: "Forbidden, teacher access required" });
        return;
    }
    next();
}