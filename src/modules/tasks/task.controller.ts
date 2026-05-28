import { TaskService } from "./task.service.js";

export class TaskController {
    static async create(req: any, res: any) {
        try {
            const boardId = req.params.boardId;
            const { title, description } = req.body;

            if (!title || title.trim().length === 0) {
                return res.status(400).json({ error: "Title required" });
            }

            const task = await TaskService.create(
                boardId,
                title.trim(),
                description
            );

            res.json(task);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async list(req: any, res: any) {
        try {
            const boardId = req.params.boardId;

            const tasks = await TaskService.list(boardId);

            res.json(tasks);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async move(req: any, res: any) {
        try {
            const { taskId } = req.params;
            const { column } = req.body;

            const updated = await TaskService.move(taskId, column);

            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async delete(req: any, res: any) {
        try {
            const { taskId } = req.params;

            await TaskService.delete(taskId);

            res.json({ message: "Task deleted" });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async assign(req: any, res: any) {
        try {
            const { taskId } = req.params;
            const { userId } = req.body;

            const task = await TaskService.assign(taskId, userId);

            res.json(task);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async unassign(req: any, res: any) {
        try {
            const { taskId } = req.params;
            const { userId } = req.body;

            const task = await TaskService.unassign(taskId, userId);

            res.json(task);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getOne(req: any, res: any) {
        try {
            const { taskId } = req.params;

            const task = await TaskService.getById(taskId);

            res.json(task);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }

    static async update(req: any, res: any) {
        try {
            const task = await TaskService.update(
                req.params.taskId,
                req.body
            );

            res.json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }


}