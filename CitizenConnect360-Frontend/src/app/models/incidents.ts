export interface Incidents{
    incidentId:string
    userName:string
    userId:string
    // incidentImg:string
    incidentDesc:string
    createdAt:string
    incidentType:string
}


export interface incidentRequest{
    // incidenttImg:string
    userId:string
    incidentId:string
    userName:string
    incidentDesc: string
    createdAt:string
}


export interface incidentResponse{
    message: string
}



export interface UpdateIncidentResponse{
    message: string
}

export interface DeleteIncidentResponse{
    message: string
}