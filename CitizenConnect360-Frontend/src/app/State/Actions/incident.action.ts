import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { incidentRequest, incidentResponse, Incidents } from "../../models/incidents";

export const IncidentActions=createActionGroup({
    source:"INCIDENT API",
    events:{
        // adding an incident
        'addincident':props<{newincident:incidentRequest}>(),
        'addincident success':props<{response:incidentResponse}>(),
        'addincident failure':props<{message:string}>(),

        // getting a single incident
        'getincident':props<{incidentId:string}>(),
        'getincident success':props<{incident:Incidents}>(),
        'getincident failure':props<{message:string}>(),

        // getting Incidents
        'getincidents':emptyProps(),
        'getincidents success':props<{allIncidents:Incidents}>(),
        'getincidents failure':props<{message:string}>(),

        
        'updateincident':props<{updatedIncident:incidentRequest, incidentId:string}>(),
        'updateincident success':props<{response:incidentResponse}>(),
        'updateincident failure':props<{message:string}>(),


        
        'deleteincident':props<{incidentId:string}>(),
        'deleteincident success':props<{response:incidentResponse}>(),
        'deleteincident failure':props<{message:string}>(),
        
    }
})