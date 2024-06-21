import { Router } from "express";
import { verifyJWTAdmin } from "../middlewares/authAdmin.middleware.js";
import { loginAdmin, logoutAdmin } from "../controllers/admin.contoller.js";

const router = Router()

router.route("/login").post(loginAdmin)

router.use(verifyJWTAdmin)

router.route("/logout").post(logoutAdmin)

export default router