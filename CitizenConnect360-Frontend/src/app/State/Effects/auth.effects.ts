import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../Actions/auth.action";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private auth: AuthService, private router: Router) {}

  signupUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.signup),
      concatMap(req => this.auth.signUpUser(req.user).pipe(
        map(res => {
          this.router.navigate(["/login"]);
          return AuthActions.signupSuccess({ response: res });
        })
      ))
    );
  });

  loginUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ user }) => this.auth.LoginUser(user).pipe(
        map(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.payload))

           // Store the userId separately for easy access
        if (res.payload && res.payload["userId"]) {
          localStorage.setItem('userId', res.payload["userId"]);
        }

        console.log('NgRx login success:', res);

          const roleName = res.payload?.roleName
          if (roleName === 'Admin') {
            this.router.navigate(['/admin-dash']);
          } else if (roleName === 'Gov-Official') {
            this.router.navigate(['/gov-dash']);
          } else {
            this.router.navigate(['/home']);
          }

          return AuthActions.loginSuccess({ response: res });
        }),
        catchError(error => of(AuthActions.loginFailure({ message: error.error.message })))
      ))
    );
  });


  requestPasswordReset$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.requestPasswordReset),
      mergeMap((action: { userEmail: string }) =>
        this.auth.requestPasswordReset(action.userEmail).pipe(
          map(response =>
            AuthActions.requestPasswordResetSuccess({ response })
          ),
          catchError(error =>
            of(AuthActions.requestPasswordResetFailure({ message: error.message }))
          )
        )
      )
    )
  );
}
