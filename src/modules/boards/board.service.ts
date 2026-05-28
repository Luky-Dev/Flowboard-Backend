import { prisma } from "../../lib/prisma.js";

export class BoardService {
  static async create(workspaceId: string, name: string) {
    return prisma.board.create({
      data: {
        name,
        workspaceId,
      },
    });
  }

  static async list(workspaceId: string) {
    return prisma.board.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(boardId: string, workspaceId: string) {
    return prisma.board.findFirst({
      where: {
        id: boardId,
        workspaceId,
      },
    });
  }


  static async createTask(
    boardId: string,
    title: string,
    description?: string
  ) {
    return prisma.task.create({
      data: {
        title,
        description: description ?? null,
        boardId,
      },
    });
  }

  static async deleteTask(taskId: string) {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }

  

}