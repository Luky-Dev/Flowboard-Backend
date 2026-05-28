import express from "express";
import cors from "cors";

import authRoutes from "./auth/auth.routes.js";
import workspaceRoutes from "./modules/workspaces/workspace.routes.js";
import boardRoutes from "./modules/boards/board.routes.js";

const app = express();

// ✅ 1. CORS PRIMERO
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// ✅ 2. body parser
app.use(express.json());

// ✅ 3. routes
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/workspaces", workspaceRoutes);

export default app;