import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ViewInterface } from "../Reducers/view.reducer";



const viewselectorFeature = createFeatureSelector<ViewInterface>('view')

export const allViewsSelector= createSelector(viewselectorFeature, (state)=>state.allViewsSuccess)
export const viewIdSelector= createSelector(viewselectorFeature, (state)=>state.viewsId)

export const viewSelector= createSelector(
    allViewsSelector, viewIdSelector,
    (allViewsSuccess, viewId) => allViewsSuccess.filter(v => v.id === viewId)
)

