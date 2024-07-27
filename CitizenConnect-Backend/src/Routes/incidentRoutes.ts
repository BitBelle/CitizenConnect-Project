import { Router } from "express";
import { verifyToken } from "../middlewares";
import { addIncident, deleteIncident, getIncident, getIncidents, updateIncident } from "../Controllers/incidentController";


const incidentRoutes = Router()

incidentRoutes.post("", addIncident)
incidentRoutes.get("", verifyToken, getIncidents)
incidentRoutes.get("/:id", verifyToken, getIncident)
incidentRoutes.delete("/:id", verifyToken, deleteIncident)
incidentRoutes.patch("/:id", verifyToken, updateIncident)


export default incidentRoutes