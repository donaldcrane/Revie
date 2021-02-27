import { Router } from "express";
import userRoutes from "./userRoutes";
import reviewRoutes from "./reviewRoutes";

const router = new Router();

router.use("/", userRoutes);
router.use("/auth", reviewRoutes);

export default router;
