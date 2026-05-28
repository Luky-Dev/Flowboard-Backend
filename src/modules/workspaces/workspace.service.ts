import { prisma } from "../../lib/prisma.js";

type Role = "ADMIN" | "MEMBER";

export class WorkspaceService {

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
  
  static async inviteUser(
    workspaceId: string,
    email: string,
    role: Role
  ) {
    // 1. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Si no existe 
    if (!user) {
      return {
        status: "PENDING",
        message: "User not found. Invite flow not implemented yet.",
        email,
        workspaceId,
        role,
      };
    }

    // 3. Verificar si ya pertenece al workspace
    const exists = await prisma.workspaceMember.findFirst({
      where: {
        userId: user.id,
        workspaceId,
      },
    });

    if (exists) {
      throw new Error("User already in workspace");
    }

    // 4. Crear membership
    const membership = await prisma.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId,
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return {
      message: "User added to workspace",
      membership,
    };
  }


  static async list(userId: string) {
    return prisma.workspace.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }


  static async getById(workspaceId: string, userId: string) {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!workspace) {
      throw new Error("Workspace not found or unauthorized");
    }

    return workspace;
  }


  static async create(userId: string, name: string) {
    const workspace = await prisma.workspace.create({
      data: {
        name,
        members: {
          create: {
            userId,
            role: "ADMIN",
          },
        },
      },
      include: {
        members: true,
      },
    });

    return workspace;
  }

  static async getBoards(workspaceId: string) {
    return prisma.board.findMany({
      where: {
        workspaceId,
      },
    });
  }
}