import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AUtils{
    
    constructor(private http:HttpClient){}

    getTorns(){
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getTorns', requestOptions);
    }
    getUnitats(){
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getUnitats', requestOptions);
    }
    getCategories():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/categories', requestOptions);
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