import prisma from "../../config/prisma";
import { Request, Response } from "express";
import {
  taskSchema,
} from "../../utils/validators";

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      taskSchema.parse(req.body);

    const title =
      validatedData.title;

    const description =
      validatedData.description;

    const user = (req as any).user;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { title, description, completed } =
      req.body;

    const user = (req as any).user;

    const existingTask =
      await prisma.task.findFirst({
        where: {
          id: Number(id),
          userId: user.id,
        },
      });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask =
      await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          description,
          completed,
        },
      });

    res.status(200).json({
      success: true,
      message: "Task updated",
      updatedTask,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const user = (req as any).user;

    const existingTask =
      await prisma.task.findFirst({
        where: {
          id: Number(id),
          userId: user.id,
        },
      });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};