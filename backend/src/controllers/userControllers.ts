import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import { CustomRequest } from "../middleware/auth";
import { changePasswordShema } from "../validators/authSchema";


export const updateProfile = async (req: CustomRequest, res: Response) => {
  try {
    const { name, email } = req.body;

    const updatedProfile = await prisma.user.update({
      where: { id: Number(req.userId) },
      data: { name, email }
    });      

    res.status(200).json({
      success: true,
      message: "Profile updated"
    });


  } catch (err) {
    res.status(500).json({
      message: "internal server err"
    })
  }
};

export const changePassword = async (req: CustomRequest, res: Response) => {
  try {
    const result = changePasswordShema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: "Invalidation errors",
      });
    }
    const { oldPassword, newPassword } = result.data;

    const userId = req.userId;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
    })
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(oldPassword, existingUser.password);
    if (!valid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: hashed }
    });

    res.status(201).json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({
      message: "internal server err"
    })
  }
};
