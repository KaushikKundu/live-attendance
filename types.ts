import z, { email, success } from 'zod';

const validationErrorSchema = z.object({
    success: z.literal(false),
    error: z.string()
})

export const signupSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(['teacher', 'student']).default('student')
})