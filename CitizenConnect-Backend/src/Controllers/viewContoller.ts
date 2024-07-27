import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { error, log } from 'console'
import { DbHelper } from '../DatabaseHelpers'
import { ViewSchema } from '../inputValidation/viewValidation'
import { ViewRequest, Views } from '../Models/viewModel'

const dbInstance = new DbHelper()

export const addView = async(req:ViewRequest, res:Response)=>{
    try{
        const id = uid()
        

        //input validation
        const {error} = ViewSchema.validate(req.body)
        if (error){
            return res.status(500).json("View Input Validation Failed!")
        }
        
        console.log('Request Body:', req.body) //incomin request body
        
        const {userId, userName, viewContent} = req.body

        if (!userId || !userName || !viewContent) {
            return res.status(400).json({message: "All fields are required"});
        }

        // Check if userId exists in Users table
        const userExists = await dbInstance.exec("checkUserExists", { userId: userId });
        if (userExists.recordset.length === 0) {
            return res.status(400).json({message: "Invalid userId"});
        }

        await dbInstance.exec("addView",{
            viewId:id, 
            userId: userId,
            userName: userName,
            viewContent:viewContent
        })

        return res.status(201).json({mesage: "View Created"})

    }catch (error){

        return res.status(500).json(error)

    }   
}

export const getView = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const view = (await dbInstance.exec('getView', {viewId:req.params.id})).recordset[0] as Views

        res.status(200).json(view)

    }catch (error){
        res.status(500).json(error)
    }
}


export const getViews:RequestHandler = async(req,res) =>{
    try{

        const views = (await dbInstance.exec('getViews',{})).recordset as Views[]
        console.log(views)

       return res.status(200).json(views)

    }catch (error){
       return res.status(500).json(error)
    }

    
}



export const updateView = async (req: ViewRequest, res: Response) => {
    try {

        const view = (await dbInstance.exec('updateView', {viewId:req.params.id})).recordset[0] as Views

        //input validation
        const {error} =ViewSchema.validate(req.body)
        if (error){
            return res.status(500).json("View Input Validation Failed!")
        }

        if (view && view.viewId) {
            
            const { userId, viewContent} = req.body;

            if (view && view.viewId) {
                await dbInstance.exec('updateView',{
                    viewId:req.params.id,
                    // userId:userId,
                    viewContent:viewContent
                })
                return res.status(200).json({ message: "View Updated" });          
        }
    }

        res.status(404).json({ message: "View not Found" });

    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteView = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const view = (await dbInstance.exec('getView', {viewId:req.params.id})).recordset[0] as Views

        if (view && view.viewId) {
            
            await dbInstance.exec('getView',{viewId:req.params.id})

            return res.status(200).json({ message: "View Deleted" })
        }

        res.status(404).json({ message: "View not Found" });

    } catch (error) {
        res.status(500).json(error);
        // console.log(error)
    }
};