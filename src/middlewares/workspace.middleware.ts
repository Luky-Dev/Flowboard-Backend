import { prisma } from "../lib/prisma.js";

export const loadMembership = async (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ error: "No authenticated user" });
  }

  const userId = req.user.userId;
  const workspaceId = req.params.workspaceId || req.params.id;

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspaceId,
    },
  });

  if (!membership) {
    return res.status(403).json({ error: "Not a member of workspace" });
  }

  req.membership = membership;

  next();
};