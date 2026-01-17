import z from 'zod';

export const signupSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(['teacher', 'student']).default('student')
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4, "Password must be at least 6 characters long")
})