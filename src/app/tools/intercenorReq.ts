import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

export class IntercetorReq implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    let newReq = req.clone({
      responseType: 'json'
    })

   return next.handle(newReq)
  }
}
