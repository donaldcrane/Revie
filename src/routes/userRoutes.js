import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  registerUser, loginUser, updateUserProfile, getUsers
} = UserController;

router.post("/users/signin", loginUser);
router.post("/users/signup", registerUser);

router.get("/users", verifyToken, getUsers);

router.patch("/user-profile", verifyToken, updateUserProfile);

export default router;
