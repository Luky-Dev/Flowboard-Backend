import { BoardService } from "./board.service.js";

export class BoardController {
  static async create(req: any, res: any) {
    try {
      const workspaceId = req.params.workspaceId;
      const { name } = req.body;

      const board = await BoardService.create(workspaceId, name);

      res.json(board);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: any, res: any) {
    try {
      const workspaceId = req.params.workspaceId;

      const boards = await BoardService.list(workspaceId);

      res.json(boards);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getOne(req: any, res: any) {
    try {
      const { boardId, workspaceId } = req.params;

      const board = await BoardService.getById(boardId, workspaceId);

      res.json(board);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static async getTasks(req: any, res: any) {
    try {
      const tasks = await BoardService.getTasks(
        req.params.id
      );

      res.json(tasks);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  static async createTask(req: any, res: any) {
    try {
      const task = await BoardService.createTask(
        req.params.id,
        req.body.title,
        req.body.description
      );

      res.json(task);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }


  
}