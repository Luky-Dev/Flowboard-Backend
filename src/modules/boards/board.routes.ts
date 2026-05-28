import { Router } from "express";
import { BoardController } from "./board.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { loadMembership } from "../../middlewares/workspace.middleware.js";
import { requireMinRole } from "../../middlewares/role.middleware.js";
import taskRoutes from "../tasks/task.routes.js";

const router = Router({ mergeParams: true });

router.use(authMiddleware);
router.use(loadMembership);
router.use("/:boardId/tasks", taskRoutes);
router.post("/", requireMinRole("ADMIN"), BoardController.create);
router.get("/", BoardController.list);

router.get("/:boardId", BoardController.getOne);

export default router;
