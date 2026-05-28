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


static async createTask(boardId: string, title: string, description?: string) {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  return prisma.task.create({
    data: {
      title,
      description: description ?? null,
      boardId,
      workspaceId: board.workspaceId, // 👈 FIX CLAVE
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
