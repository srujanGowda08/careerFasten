import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {newFeedback, getAllFeedback, getFeedbackById, deleteFeedback, updateFeedback} from "../controllers/feedback.controller.js"

const router = Router()

router.use(verifyJWT)

router.route("/new-feedback").post(newFeedback)
router.route("/all-feedback").get(getAllFeedback)
router.route("/feedback/:_id").get(getFeedbackById)
router.route("/delete-feedback/:_id").delete(deleteFeedback)
router.route("/update-feedback/:_id").patch(updateFeedback)

export default router