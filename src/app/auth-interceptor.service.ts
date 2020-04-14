import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Request on its way");
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    })
    return next.handle(modifiedReq);
  } 
  constructor() { }
}
