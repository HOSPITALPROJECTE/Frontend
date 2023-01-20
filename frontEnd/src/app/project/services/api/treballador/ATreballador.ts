import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ATreballador{
    
    constructor(private http:HttpClient){}

    getTreballador():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/user/treballadors');
    }
    getCategories():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/user/categories');
    }

    private createHeader(){

        const header = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Acces-Control-Allow-Headers':'Origin, Content-Type, Accept,Authorization',
        }
        return {headers: new HttpHeaders(header)};
    }

}