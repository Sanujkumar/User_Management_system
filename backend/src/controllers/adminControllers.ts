import { Request, Response } from "express";
import prisma from "../db";
import { Role } from "@prisma/client";
import { CustomRequest } from "../middleware/auth";

export const allStudents = async (req: CustomRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: Role.USER },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          lastLogin: true,
          createdAt: true,
        },
      }),
      prisma.user.count({
        where: { role: Role.USER },
      }),
    ]);

    res.status(200).json({
      students,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const activateStudent = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: { isActive: true },
    });

    res.status(200).json({
      message: "User activated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const deactivateStudent = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    if (req.userId === id) {
      return res.status(400).json({
        message: "You cannot deactivate your own account",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });

    res.status(200).json({
      message: "User deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

