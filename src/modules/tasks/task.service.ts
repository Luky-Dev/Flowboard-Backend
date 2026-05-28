import { prisma } from "../../lib/prisma.js";
import { TaskColumn } from "@prisma/client";

export class TaskService {

    static async create(
        boardId: string,
        title: string,
        description?: string
    ) {
        const board = await prisma.board.findUnique({
            where: { id: boardId },
            select: { workspaceId: true },
        });

        if (!board) {
            throw new Error("Board not found");
        }

      return prisma.task.create({
          data: {
            boardId,
            workspaceId,
            title,
            description: description ?? null,
            column: "UNASSIGNED",
          },
        });
    }

    static async list(boardId: string) {
        return prisma.task.findMany({
            where: { boardId },
            orderBy: { createdAt: "desc" },
            include: {
                assignees: {
                    include: {
                        user: true,
                    },
                },
                comments: true,
            },
        });
    }

    static async move(taskId: string, column: TaskColumn) {
        if (!Object.values(TaskColumn).includes(column)) {
            throw new Error("Invalid column");
        }

        return prisma.task.update({
            where: { id: taskId },
            data: { column },
        });
    }

    static async delete(taskId: string) {
        return prisma.task.delete({
            where: { id: taskId },
        });
    }

    static async assign(taskId: string, userId: string) {
        return prisma.taskAssignee.upsert({
            where: {
                taskId_userId: {
                    taskId,
                    userId,
                },
            },
            create: { taskId, userId },
            update: {},
        });
    }

    static async unassign(taskId: string, userId: string) {
        return prisma.taskAssignee.deleteMany({
            where: {
                taskId,
                userId,
            },
        });
    }
    static async getById(taskId: string) {
        return prisma.task.findUnique({
            where: { id: taskId },
            include: {
                assignees: {
                    include: {
                        user: true,
                    },
                },
                comments: true,
            },
        });
    }

    static async update(taskId: string, data: any) {
        return prisma.task.update({
            where: { id: taskId },
            data,
        });
    }
}
