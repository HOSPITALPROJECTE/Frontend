import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  constructor(private http: HttpClient, private router: Router) { }
  
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

