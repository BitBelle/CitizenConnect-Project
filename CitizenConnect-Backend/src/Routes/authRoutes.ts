import { Router } from "express";
import { registerUser,loginUser, deleteUser, getUsers, getUser, approveUser, getNotifications, getDeletedUsers} from "../Controllers/authController";
import { requestPasswordReset} from "../Controllers/requestPwdController";
import { resetPassword } from "../Controllers/resetPasswordController";
import { checkRole, verifyToken } from "../middlewares"

const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("/users", getUsers)
authRoutes.get("/:id", getUser)
authRoutes.delete("/:id", verifyToken, checkRole("Admin"), deleteUser)
authRoutes.get("/deletedUsers", getDeletedUsers)


authRoutes.post('/reset-password-request', requestPasswordReset);
authRoutes.post('/reset-password', resetPassword);

authRoutes.get('/gov-OfficialRequests', verifyToken, getNotifications)

authRoutes.post('/approveUser', verifyToken, approveUser)




export default authRoutes