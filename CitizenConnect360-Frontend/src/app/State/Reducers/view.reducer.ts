import { createReducer, on } from "@ngrx/store"
import { ViewActions } from "../Actions/view.action"
import { Views } from "../../models/view"


export interface ViewInterface {
    viewsId:string

    view: Views[]
    allViewsSuccess:string
    allViewsLoading:boolean

    addViewSuccessMessage:string
    addViewErrorMessage:string
    addViewLoading:boolean

    getViewSuccessMessage:Views[]
    getViewErrorMessage:string
    getViewLoading:boolean

    
    getViewsSuccessMessage:Views[]
    getViewsErrorMessage:string
    getViewsLoading:boolean

    
    updateViewSuccessMessage:string
    updateViewErrorMessage:string
    updateViewLoading:boolean

    
    deleteViewSuccessMessage:string
    deleteViewErrorMessage:string
    deleteViewLoading:boolean
}


const initialstate:ViewInterface={
    viewsId: '',

    view: [],
    allViewsSuccess: "",
    allViewsLoading: false,

    addViewSuccessMessage: '',
    addViewErrorMessage: '',
    addViewLoading: false,

    getViewSuccessMessage: [],
    getViewErrorMessage: '',
    getViewLoading: false,


    getViewsSuccessMessage: [],
    getViewsErrorMessage: '',
    getViewsLoading: false,


    updateViewSuccessMessage: '',
    updateViewErrorMessage: '',
    updateViewLoading: false,


    deleteViewSuccessMessage: '',
    deleteViewErrorMessage: '',
    deleteViewLoading: false,
    
}


export const viewReducer= createReducer(
    initialstate,

    // adding views
    on(ViewActions.addView, (state)=>{
        return{
            ...state,
            addViewErrorMessage:'',
            addViewSuccessMessage:'',
            addViewLoading:true
        }
    }),

    on(ViewActions.addViewSuccess, (state, action)=>{
        return{
            ...state,
            addViewErrorMessage:'',
            addViewSuccessMessage:action.response.message,
            addViewLoading:false
        }
    }),
    on(ViewActions.addViewFailure, (state, {message})=>{
        return{
            ...state,
            addViewSuccessMessage:'',
            addViewErrorMessage:message,
            addViewLoading:false
        }
    }),

    // getting a single view
    // on(ViewActions.getView, (state, {viewId}) => {
    //     return{
    //         ...state,
    //         getViewSuccessMessage:{},
    //         getViewErrorMessage:'',
    //         getViewLoading:true,
    //     }
    // }),

    on(ViewActions.getViewSuccess, (state, {view})=>{
        return{
            ...state,
            getViewSuccessMessage:view,
            getViewErrorMessage: '',
            getViewLoading:false
        }
    }),

    // on(ViewActions.getViewFailure, (state, {updatedView, viewId})=>{
    //     return{
    //         ...state,
    //         getViewSuccessMessage:'',
    //         getViewErrorMessage:'',
    //         getViewLoading:false
    //     }
    // }),

    // getting all views
    on(ViewActions.getViews, (state)=>{
        return{
            ...state,
            getViewsSuccessMessage:[],
            getViewsErrorMessage:'',
            getViewsLoading:true
        }
    }),

    on(ViewActions.getViewsSuccess, (state, {view})=>{
        return{
            ...state,
            view: view,
            allViewsSuccess: '',
            allViewsLoading:false
        }
    }),
    on(ViewActions.getViewsFailure, (state, {message})=>{
        return{
            ...state,
            view: [],
            allViewsSuccess: message,
            allViewsLoading:false
        }
    }),

    // updating a view
    // on(ViewActions.updateView, (state, {updatedView, viewId})=>{
    //     return{
    //         ...state,
    //         updateViewSuccessMessage:'',
    //         updateViewErrorMessage:'',
    //         updateViewLoading:true
    //     }   
    // }),

    on(ViewActions.updateViewSuccess, (state, {response})=>{
        return{
            ...state,
            updateViewSuccessMessage: response.message,
            updateViewrorMessage: '',
            updateViewLoading:false
        }
    }),
    on(ViewActions.updateViewFailure, (state, {message})=>{
        return{
            ...state,
            updateViewSuccessMessage:'',
            updateViewErrorMessage: message,
            updateViewLoading:false
        }
    }),

    
    // deleting a view
    on(ViewActions.deleteView, (state, {viewId})=>{
        return{
            ...state,
            deleteViewSuccessMessage:'',
            deleteViewErrorMessage:'',
            deleteViewLoading:true
        }   
    }),

    on(ViewActions.deleteViewSuccess, (state, {response})=>{
        return{
            ...state,
            deleteViewSuccessMessage: response.message,
            deleteViewrorMessage: '',
            deleteViewLoading:false
        }
    }),
    on(ViewActions.deleteViewFailure, (state, {message})=>{
        return{
            ...state,
            deleteViewSuccessMessage:'',
            deleteViewErrorMessage: message,
            deleteViewLoading:false
        }
    }),

    
)
