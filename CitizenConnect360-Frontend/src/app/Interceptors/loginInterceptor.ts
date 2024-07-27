import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function loginInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    if (req.url === "http://localhost:4000/auth/register" || req.url==="http://localhost:4000/auth/login" 
        || req.url === "http://localhost:4000/auth/reset-password-request") 
        {
        return next(req);
        } 

        const token = localStorage.getItem('token') as string
        console.log(token)
        
        const modifiedRequest = req.clone({ headers: new HttpHeaders().append('token', token) });
        return next(modifiedRequest)
    }




