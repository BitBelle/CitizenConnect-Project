import { createActionGroup, props } from "@ngrx/store";
import { User, SignUpResponse, LogInResponse, LoginUser, PasswordResetResponse } from "../../models/user";

export const AuthActions = createActionGroup({
    source: "AUTH API",
    events: {

        'signup': props<{ user: User }>(),
        'signup success': props<{ response: SignUpResponse }>(),
        'signup failure': props<{ message: string }>(),

        'login': props<{ user: LoginUser }>(),
        'login success': props<{ response: LogInResponse }>(),
        'login failure': props<{ message: string }>(),


        // / Password Reset Actions
    'request password reset': props<{ userEmail: string }>(),
    'request password reset success': props<{response:PasswordResetResponse}>(),
    'request password reset failure': props<{ message: string }>(),


    }
})