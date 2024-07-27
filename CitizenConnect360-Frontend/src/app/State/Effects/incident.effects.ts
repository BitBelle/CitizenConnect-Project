import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { ViewActions } from "../Actions/view.action";
import { catchError, concatMap, exhaustMap, map, of } from "rxjs";
import { IncidentActions } from "../Actions/incident.action";
import { IncidentService } from "../../services/incidents/incident.service";


@Injectable()
export class IncidentEffects {
    constructor(private action$: Actions, private incidentService: IncidentService, private router: Router) { }


    addIncident$ = createEffect(() => {
        return this.action$.pipe(
            ofType(IncidentActions.addincident),
            concatMap((req) => this.incidentService(req.user).pipe( 
                map(res => {
                    this.router.navigate(["/incidents"]);
                    return IncidentActions.addincidentSuccess({ response: res });
                }),
                catchError(error => of(IncidentActions.addincidentFailure({ message: error })

                ))
            ))
        );
    });


    getIncidents$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(IncidentActions.getincidents),
            concatMap(()=>this.incidentService.getIncidents().pipe(
                map(res => {
                    return IncidentActions.getincidentSuccess({incident:res})
                }),
                catchError(error => of(IncidentActions.
                    getincidentFailure({message:error})
                ))
            ))
        )
    })


    getIncident$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(IncidentActions.getincident),
            exhaustMap((req)=>this.incidentService.getIncident(req.incidentId).pipe(
                map(res =>{
                    return IncidentActions.getincidentSuccess({incident:res})
                }),
                catchError(error => of(IncidentActions
                    .getincidentFailure({message:error})
                ))
                )
            )
        )
    }) 



    updateIncident$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(IncidentActions.updateincident),
            concatMap((req)=>this.incidentService.updateIncident(req.updatedIncident, req.incidentId).pipe(
                map(res =>{
                    return IncidentActions.updateincidentSuccess({response:res})
                }),
                catchError(error => of(IncidentActions
                    .updateincidentFailure({message:error})
                ))
                )
            )
        )
    }) 



    deleteIncident$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(IncidentActions.deleteincident),
            // ***
            concatMap((req)=>this.incidentService.deleteIncident(req.incidentId).pipe(
                map(res =>{
                    return IncidentActions.deleteincidentSuccess({response:res})
                }),
                catchError(error => of(IncidentActions
                    .deleteincidentFailure({message:error})
                ))
                )
            )
        )
    }) 

}