import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { viewRequest, viewResponse, Views } from "../../models/view";

export const ViewActions=createActionGroup({
    source:"VIEWS API",
    events:{
        // adding a view
        'addView':props<{newView:viewRequest}>(),
        'addView success':props<{response:viewResponse}>(),
        'addView failure':props<{message:string}>(),

        // getting a view by userId
        'getView':props<{userId: string}>(),
        'getView success':props<{view:Views[]}>(),
        'getView failure':props<{message:string}>(),

        // getting all views
        'getViews':emptyProps,
        'getViews success':props<{view:Views[]}>(),
        'getViews failure':props<{message:string}>(),

        // updating a view
        'updateView':props<{viewId:string}>(),
        'updateView success':props<{response:viewResponse}>(),
        'updateView failure':props<{message:string}>(),

        
        'deleteView':props<{viewId:string}>(),
        'deleteView success':props<{response:viewResponse}>(),
        'deleteView failure':props<{message:string}>(),
        
    }
})