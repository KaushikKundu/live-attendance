import { Router } from "express";
import { signupSchema } from "../types";
import mongoose from "mongoose";
import { User } from "../models";

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
authRouter.post("/login", (req, res) => {

});

export default authRouter;