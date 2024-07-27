import { createReducer, on } from "@ngrx/store"
import { ViewActions } from "../Actions/view.action"
import { Views } from "../../models/view"
import { Incidents } from "../../models/incidents"
import { IncidentActions } from "../Actions/incident.action"


export interface IncidentInterface {
    incidentId:string

    incident: Incidents[]
    allIncidentsSuccess:string
    allVIncidentsLoading:boolean

    addIncidentSuccessMessage:string
    addIncidentErrorMessage:string
    addIncidentLoading:boolean

    getIncidentSuccessMessage:Incidents[]
    getIncidentErrorMessage:string
    getIncidentLoading:boolean

    
    getIncidentsSuccessMessage:Incidents[]
    getIncidentsErrorMessage:string
    getIncidentsLoading:boolean

    
    updateIncidentSuccessMessage:string
    updateIncidentErrorMessage:string
    updateIncidentLoading:boolean

    
    deleteIncidentSuccessMessage:string
    deleteIncidentErrorMessage:string
    deleteIncidentLoading:boolean
}


const initialstate:IncidentInterface={
    incidentId: '',

    incident: [],
    allIncidentsSuccess: "",
    allVIncidentsLoading: false,

    addIncidentSuccessMessage: '',
    addIncidentErrorMessage: '',
    addIncidentLoading: false,

    getIncidentSuccessMessage: [],
    getIncidentErrorMessage: '',
    getIncidentLoading: false,


    getIncidentsSuccessMessage: [],
    getIncidentsErrorMessage: '',
    getIncidentsLoading: false,


    updateIncidentSuccessMessage: '',
    updateIncidentErrorMessage: '',
    updateIncidentLoading: false,


    deleteIncidentSuccessMessage: '',
    deleteIncidentErrorMessage: '',
    deleteIncidentLoading: false,
    
}


export const incidentReducer= createReducer(
    initialstate,

    // adding incident
    on(IncidentActions.addincident, (state)=>{
        return{
            ...state,
            addIncidentErrorMessage:'',
            addIncidentSuccessMessage:'',
            addIncidentLoading:true
        }
    }),

    on(IncidentActions.addincidentSuccess, (state, action)=>{
        return{
            ...state,
            addIncidentErrorMessage:'',
            addIncidentSuccessMessage:action.response.message,
            addIncidentLoading:false
        }
    }),
    on(IncidentActions.addincidentFailure, (state, {message})=>{
        return{
            ...state,
            addIncidentSuccessMessage:'',
            addIncidentErrorMessage:message,
            addIncidentLoading:false
        }
    }),

    // getting a single incident
    on(IncidentActions.getincident, (state, {incidentId}) => {
        return{
            ...state,
            getIncidentSuccessMessage:{},
            getIncidentErrorMessage:'',
            getIncidentLoading:true,
        }
    }),

    on(IncidentActions.getincidentSuccess, (state, {incident})=>{
        return{
            ...state,
            getIncidentSuccessMessage:incident,
            getIncidentErrorMessage: '',
            getIncidentLoading:false
        }
    }),

    on(IncidentActions.getincidentFailure, (state, {updatedIncident, IncidentId})=>{
        return{
            ...state,
            getIncidentSuccessMessage:'',
            getIncidentErrorMessage:'',
            getIncidentLoading:false
        }
    }),

    // getting all views
    on(IncidentActions.getincidents, (state)=>{
        return{
            ...state,
            getIncidentsSuccessMessage:[],
            getIncidentsErrorMessage:'',
            getIncidentsLoading:true
        }
    }),

    on(IncidentActions.getincidentSuccess, (state, {incident})=>{
        return{
            ...state,
            incident: incident,
            allIncidentsSuccess: '',
            allIncidentsLoading:false
        }
    }),
    on(IncidentActions.getincidentsFailure, (state, {message})=>{
        return{
            ...state,
            incident: [],
            allIncidentsSuccess: message,
            allIncidentsLoading:false
        }
    }),

    // updating a incident
    on(IncidentActions.updateincident, (state, {updatedIncident, incidentId})=>{
        return{
            ...state,
            updateIncidentSuccessMessage:'',
            updateIncidentErrorMessage:'',
            updateIncidentLoading:true
        }   
    }),

    on(IncidentActions.updateincidentSuccess, (state, {response})=>{
        return{
            ...state,
            updateIncidentSuccessMessage: response.message,
            updateIncidentrorMessage: '',
            updateIncidentLoading:false
        }
    }),
    on(IncidentActions.updateincidentFailure, (state, {message})=>{
        return{
            ...state,
            updateIncidentSuccessMessage:'',
            updateIncidentErrorMessage: message,
            updateIncidentLoading:false
        }
    }),

    
    // deleting incident
    on(IncidentActions.deleteincident, (state, {incidentId})=>{
        return{
            ...state,
            deleteIncidentSuccessMessage:'',
            deleteIncidentErrorMessage:'',
            deleteIncidentLoading:true
        }   
    }),

    on(IncidentActions.deleteincidentSuccess, (state, {response})=>{
        return{
            ...state,
            deleteIncidentSuccessMessage: response.message,
            deleteIncidentrorMessage: '',
            deleteIncidentLoading:false
        }
    }),
    on(IncidentActions.deleteincidentFailure, (state, {message})=>{
        return{
            ...state,
            deleteIncidentSuccessMessage:'',
            deleteIncidentErrorMessage: message,
            deleteIncidentLoading:false
        }
    }),

    
)
