import { Router } from "express";
import { registerUser,loginUser, deleteUser, getUsers, getUser} from "../Controllers/authController";
import { verifyToken } from "../middlewares";
import { addView, deleteView, getView, getViews, updateView } from "../Controllers/viewContoller";
import { addPoll, deletePoll, getPollsWithOptions} from "../Controllers/pollControllers";


const pollRoutes = Router()

pollRoutes.post("", addPoll)
pollRoutes.get("", verifyToken, getPollsWithOptions)
pollRoutes.delete("/:pollQuestionId", verifyToken, deletePoll)
// pollRoutes.patch("", verifyToken, updatePoll)


export default pollRoutes