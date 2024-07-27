import { Router } from "express";
import { registerUser,loginUser, deleteUser, getUsers, getUser} from "../Controllers/authController";
import { verifyToken } from "../middlewares";
import { addView, deleteView, getView, getViews, updateView } from "../Controllers/viewContoller";


const viewRoutes = Router()

viewRoutes.post("", addView)
viewRoutes.get("",verifyToken, getViews)
viewRoutes.get("/:id", verifyToken,getView)
viewRoutes.delete("/:id", verifyToken, deleteView)
viewRoutes.patch("/:id", verifyToken, updateView)


export default viewRoutes