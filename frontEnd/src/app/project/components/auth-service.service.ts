import { HttpClient, HttpHeaders , HttpErrorResponse, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  constructor(private http: HttpClient) { }
  
  login(user : any): Observable<any> {
    let headers = this.createHeader();
    return this.http.post('http://localhost:4000/api/user/login', user , headers);
  }

  private createHeader(){

    const header = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Acces-Control-Allow-Headers':'*',
    }
    return {headers: new HttpHeaders(header)};
}
}

