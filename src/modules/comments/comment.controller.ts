import { CommentService } from "./comment.service.js";

export class CommentController {
  static async create(req: any, res: any) {
    try {
      const taskId = req.params.taskId;
      const userId = req.user.userId;
      const { content } = req.body;

      const comment = await CommentService.create(taskId, userId, content);

      res.json(comment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: any, res: any) {
    try {
      const taskId = req.params.taskId;

      const comments = await CommentService.list(taskId);

      res.json(comments);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: any, res: any) {
    try {
      const commentId = req.params.commentId;
      const userId = req.user.userId;

      await CommentService.delete(commentId, userId);

      res.json({ message: "Comment deleted" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}