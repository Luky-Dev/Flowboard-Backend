import { Router } from "express";
import { WorkspaceController } from "./workspace.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import boardRoutes from "../boards/board.routes.js";
import { loadMembership } from "../../middlewares/load-membership.middleware.js";
const router = Router();

router.use(authMiddleware);
router.use("/:workspaceId/boards", boardRoutes);
router.post("/", WorkspaceController.create);
router.get("/:id", WorkspaceController.getOne);
router.get("/:id/users", WorkspaceController.getUsers);


router.get(
    "/:id/boards",
    loadMembership,
    WorkspaceController.getBoards
);

router.post("/:id/invite", WorkspaceController.invite);


export default router;
