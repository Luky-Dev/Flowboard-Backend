import { Router } from "express";
import { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import commentRoutes from "../comments/comment.routes.js";
import { BoardController } from "../boards/board.controller.js";

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", TaskController.create);
router.get("/", TaskController.list);
router.get("/:taskId", TaskController.getOne);

router.post("/:taskId/assign", TaskController.assign);
router.post("/:taskId/unassign", TaskController.unassign);
router.patch("/:taskId/move", TaskController.move);

router.put("/:taskId", TaskController.update);
router.delete("/:taskId", TaskController.delete);

router.use("/:taskId/comments", commentRoutes);

export default router;