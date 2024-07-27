import { Request } from "express"

export interface IncidentRequest extends Request{
    body:{
        userId:string
        userName:string
        incidentImg?:string
        incidentDesc:string
    }
}

export interface Incidents{
    incidentId:string
    userId:string
    incidentImg:string
    incidentDesc:string
    createdAt:string
}