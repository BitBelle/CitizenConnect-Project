import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { ViewActions } from "../Actions/view.action";
import { catchError, concatMap, exhaustMap, map, of } from "rxjs";
import { ViewService } from "../../services/views/view.service";


@Injectable()
export class ViewEffects {
    constructor(private action$: Actions, private viewService: ViewService, private router: Router) { }


    addView$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ViewActions.addView),
            concatMap(req => this.viewService(req.user).pipe(
                map(res => {
                    this.router.navigate(["/views"]);
                    return ViewActions.addViewSuccess({ response: res });
                }),
                catchError(error => of(ViewActions.addViewFailure({ message: error })

                ))
            ))
        );
    });


    getViews$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ViewActions.getViews),
            concatMap(()=>this.viewService.getViews().pipe(
                map(res => {
                    return ViewActions.getViewsSuccess({view:res})
                }),
                catchError(error => of(ViewActions.
                    getViewsFailure({message:error})
                ))
            ))
        )
    })


    getView$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ViewActions.getView),
            exhaustMap((req)=>this.viewService.getView(req.viewId).pipe(
                map(res =>{
                    return ViewActions.getViewSuccess({views:res})
                }),
                catchError(error => of(ViewActions
                    .getViewFailure({message:error})
                ))
                )
            )
        )
    }) 



    updateView$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ViewActions.updateView),
            concatMap((req)=>this.viewService.updateView(req.viewId, req.view).pipe(
                map(res =>{
                    return ViewActions.updateViewSuccess({response:res})
                }),
                catchError(error => of(ViewActions
                    .updateViewFailure({message:error})
                ))
                )
            )
        )
    }) 



    deleteView$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ViewActions.deleteView),
            // ***
            concatMap((req)=>this.viewService.deleteView(req.viewId).pipe(
                map(res =>{
                    return ViewActions.deleteViewSuccess({response:res})
                }),
                catchError(error => of(ViewActions
                    .deleteViewFailure({message:error})
                ))
                )
            )
        )
    }) 

}