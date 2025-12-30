import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain 1 number"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password is required"),
});

export const changePasswordShema = z.object({
    oldPassword: z  
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain 1 number"),
    newPassword:  z  
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain 1 number"),
})
