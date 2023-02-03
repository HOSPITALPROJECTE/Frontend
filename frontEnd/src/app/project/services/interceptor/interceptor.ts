import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('hospital-accessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Valid');
    } else {
      console.log('Invalid');
      return throwError(new Error('Token is missing or invalid.'));
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('An error occurred:', error);
        return throwError(error);
      })
    );
  }
}