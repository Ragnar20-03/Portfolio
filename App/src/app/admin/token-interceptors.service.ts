import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorsService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
        setHeaders : {
          authorization  :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvc2hhbiIsImlkIjoiNjU5NTkwNGJlMjMyYmNjMTBhNmM0MjVjIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzA0MzAwNjIzfQ.4-vfoIEbO9Aw3xo4kgvRsGz4qj5m8FcpqsXdzTSLqiY"
        }
    })
    return next.handle(newReq)
  }
}
