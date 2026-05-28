import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", CommentController.create);
router.get("/", CommentController.list);
router.delete("/:commentId", CommentController.delete);

export default router;