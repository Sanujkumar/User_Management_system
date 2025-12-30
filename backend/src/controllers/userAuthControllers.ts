import {Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from "../middleware/auth";
import { loginSchema, registerSchema } from "../validators/authSchema";
import { string } from "zod";
dotenv.config();
  

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;



export const registerUsers = async (req: CustomRequest, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: "Validation Failed",
      });
    }

    const { name, email, password, role } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: role || "USER",   
      },
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
     if (!result.success) {
      return res.status(400).json({
        errors: "Invalidation errors",
      });
    }
    const {email,password} = result.data;


    const isUserExist = await prisma.user.findUnique({
      where: { email },
      select: {id:true, name: true, password: true,email: true,role: true }
    });


    if (!isUserExist) {
      res.status(404).json({
        success: true,
        error: "user doesn't exist"
      });
      return;
    }

    if (isUserExist) {
      const isPassword = await bcrypt.compare(password, isUserExist.password);
      if (!isPassword) {
        res.status(401).json({
          success: false,
          message: "password is not correct"
        })
        return;
      }
      isUserExist.password = ""
    }

    const user = {
      name: isUserExist.name,
      password: isUserExist.password,
      email: isUserExist.email,
      role: isUserExist.role,
      id: isUserExist.id,
      
    }


    const token = Jwt.sign({
      user: user
    }, JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: isUserExist.id,
        name: isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role,
      }
    })

  } catch (err) {
    res.status(500).json({
      message: "internal server err"
    });
  }
    
}

export const getMe = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Account deactivated",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


