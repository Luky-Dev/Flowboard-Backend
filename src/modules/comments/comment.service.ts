import { prisma } from "../../lib/prisma.js";

export class CommentService {
  static async create(taskId: string, userId: string, content: string) {
    return prisma.comment.create({
      data: {
        content,
        taskId,
        userId,
      },
    });
  }

  static async list(taskId: string) {
    return prisma.comment.findMany({
      where: { taskId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  static async delete(commentId: string, userId: string) {
    // opcional: solo dueño puede borrar
    return prisma.comment.deleteMany({
      where: {
        id: commentId,
        userId,
      },
    });
  }
}