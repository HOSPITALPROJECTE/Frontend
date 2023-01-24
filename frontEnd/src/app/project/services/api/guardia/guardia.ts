import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AGuardia{
    
    constructor(private http:HttpClient){}

    getTreballador():Observable<any>{
        return this.http.get('http://172.24.1.253:4000/api/user/guardies');
    }
}