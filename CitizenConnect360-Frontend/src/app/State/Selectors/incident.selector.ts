import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IncidentInterface } from "../Reducers/incident.reducer";



const incidentselectorFeature = createFeatureSelector<IncidentInterface>('incident')

export const allIncidentsSelector= createSelector(incidentselectorFeature, (state)=>state.allIncidentsSuccess)
export const incidentIdSelector= createSelector(incidentselectorFeature, (state)=>state.incidentId)

export const incidentSelector= createSelector(
    allIncidentsSelector, incidentIdSelector,
    (allIncidentsSuccess, incidentId) => allIncidentsSuccess.filter(i => i.id === incidentId)
)

