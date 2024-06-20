import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/login").post(loginUser)

router.use(verifyJWT)

router.route("/logout").post(logoutUser)
export default router