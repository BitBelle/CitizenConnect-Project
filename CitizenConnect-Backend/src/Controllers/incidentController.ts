import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { error } from 'console'
import { DbHelper } from '../DatabaseHelpers'
import { ViewSchema } from '../inputValidation/viewValidation'
import { ViewRequest, Views } from '../Models/viewModel'
import { IncidentRequest, Incidents } from '../Models/incidentModel'
import { IncidentSchema } from '../inputValidation/incidentValidation'

const dbInstance = new DbHelper()

export const addIncident = async(req:IncidentRequest, res:Response)=>{
    try{
        const id = uid()
        
        console.log(req.body);

        //input validation
        const {error} = IncidentSchema.validate(req.body)
        if (error){
            return res.status(500).json("Incident Input Validation Failed!")
        }
            
        const {userId, userName, incidentImg, incidentDesc} = req.body

        if (!userId || !userName || !incidentImg || !incidentDesc) {
            return res.status(400).json({message: "All fields are required"});
        }

        await dbInstance.exec("addIncident",{
            incidentId:id, 
            userId:userId,
            userName:userName,
            incidentImg:incidentImg,
            incidentDesc:incidentDesc
        })

        return res.status(201).json({mesage: "Incident Created"})

    }catch (error){

        return res.status(500).json(error)

    }   
}

export const getIncident = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const incident = (await dbInstance.exec('getIncident', {incidentId:req.params.id})).recordset[0] as Incidents

        res.status(200).json(incident)

    }catch (error){
        res.status(500).json(error)
    }
}


export const getIncidents:RequestHandler = async(req,res) =>{
    try{

        const incidents = (await dbInstance.exec('getIncidents',{})).recordset as Incidents[]
        console.log(incidents)

       return res.status(200).json(incidents)

    }catch (error){
       return res.status(500).json(error)
    }
  
}



export const updateIncident = async (req: IncidentRequest, res: Response) => {
    try {
        // Input validation
        const { error } = IncidentSchema.validate(req.body);
        if (error) {
            return res.status(500).json("Incident Input Validation Failed!");
        }

        const { incidentImg, incidentDesc } = req.body;
        
        const incidentId = req.params.id;

        if (!incidentImg || !incidentDesc) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update the incident
        await dbInstance.exec('updateIncident', {
            incidentId: incidentId,
            incidentImg: incidentImg,
            incidentDesc: incidentDesc
        });

        return res.status(200).json({ message: "Incident Updated" });
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const deleteIncident = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const incident = (await dbInstance.exec('getIncident', {incidentId:req.params.id})).recordset[0] as Incidents

        if (incident && incident.incidentId) {
            
            await dbInstance.exec('getIncident',{incidentId:req.params.id})

            return res.status(200).json({ message: "Incident Deleted" })
        }

        res.status(404).json({ message: "Incident not Found" });

    } catch (error) {
        res.status(500).json(error);
        // console.log(error)
    }
};