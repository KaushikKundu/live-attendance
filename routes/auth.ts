import { Router } from "express";
import { loginSchema, signupSchema } from "../types";
import { User } from "../models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isAuthenticated } from "../middleware";

dotenv.config();

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    const {success,data} = signupSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            success: false,
            error: "Invalid request schema",
        })
        return;
    }
    const {name, email, password, role} = data;
    // Here you would normally handle user creation logic (e.g., save to database)
    const user = await User.findOne({ email });
    if(user){
        res.status(400).json({
            success: false,
            error: "Email already exists",
        })
        return;
        
    }
    const newUser = await User.create({
        name, email, password, role
    })
    res.status(201).json({
        success: true,
        data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    })

})
authRouter.post("/login", async (req, res) => {
    const {success,data} = loginSchema.safeParse(req.body);
    if(!success){
        res.status(400).json({
            success: false,
            error: "Invalid request schema",
        })
        return;
    }
    const {email, password} = data;
    try {
        const existingUser = await User.findOne({ email, password });
        if (!existingUser) {
            res.status(400).json({
                success: false,
                error: "Invalid email or password",
            });
            return;
        }
        const token = jwt.sign(
            { userId: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET || 'DEFAULT_SECRET_KEY'
        )
        res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
      
});
authRouter.get("/me",isAuthenticated, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                error: "User not found",
            });
            return;
        }
         res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
        return;
    }
    
})

export default authRouter;