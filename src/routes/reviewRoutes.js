import { Router } from "express";
import AdminReviewController from "../controllers/Review";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  addReview, addHelpfulReview, getReviewById, getReviews, deleteReview, updateReview
} = AdminReviewController;

router.get("/reviews", verifyToken, getReviews);
router.get("/review/:id", verifyToken, getReviewById);

router.post("/review", verifyToken, addReview);
router.post("/helpful-review/:id", verifyToken, addHelpfulReview);

router.patch("/review/:id", verifyToken, updateReview);
router.delete("/review/:id", verifyToken, deleteReview);

export default router;
