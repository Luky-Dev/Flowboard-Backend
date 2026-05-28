import { WorkspaceService } from "./workspace.service.js";
import { prisma } from "../../lib/prisma.js";

export class WorkspaceController {

  static async getUsers(req: any, res: any) {
  try {
    const workspaceId = req.params.id;

    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId },
      include: { user: true },
    });

    const users = members.map(m => m.user);

    return res.json(users);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

  static async create(req: any, res: any) {
    try {
      const userId = req.user.userId;
      const { name } = req.body;

      const workspace = await WorkspaceService.create(userId, name);

      res.json(workspace);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: any, res: any) {
    try {
      const userId = req.user.userId;

      const workspaces = await WorkspaceService.list(userId);

      res.json(workspaces);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getOne(req: any, res: any) {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const workspace = await WorkspaceService.getById(id, userId);

      res.json(workspace);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static async invite(req: any, res: any) {
    try {
      const workspaceId = req.params.id;
      const { email, role } = req.body;

      const result = await WorkspaceService.inviteUser(
        workspaceId,
        email,
        role
      );

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getBoards(req: any, res: any) {
    try {
      const boards = await WorkspaceService.getBoards(
        req.params.id
      );

      res.json(boards);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }


  static async getMembers(req: any, res: any) {
    try {
      const { workspaceId } = req.params.id;

      const members = await WorkspaceService.getMembers(workspaceId);

      res.json(
        members.map((m) => ({
          id: m.user.id,
          name: m.user.name,
          email: m.user.email,
          role: m.role,
        }))
      );
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
