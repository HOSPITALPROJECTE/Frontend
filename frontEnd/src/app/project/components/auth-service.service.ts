import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  constructor(private http: HttpClient, private router: Router) { }

  login(noms: string, contrasenyes: string): Observable<any> {
    return this.http.post('/login', {noms, contrasenyes})
    
  }
}

