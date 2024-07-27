import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthInterface } from "../Reducers/auth.reducer";



const authselectorFeature = createFeatureSelector<AuthInterface>('auth')

export const errorSelectorSignup= createSelector(authselectorFeature, (state)=>state.signupErrorMessage)
export const successSelectorSignup= createSelector(authselectorFeature, (state)=>state.signupSuccessMessage)

export const errorSelectorLogin= createSelector(authselectorFeature, (state)=>state.loginErrorMessage)
export const successSelectorLogin= createSelector(authselectorFeature, (state)=>state.loginSuccessMessage)