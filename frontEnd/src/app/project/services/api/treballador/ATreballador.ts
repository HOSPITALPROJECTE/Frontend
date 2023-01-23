import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ATreballador{
    
    constructor(private http:HttpClient){}

    getTreballadors():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/treballadors');
    }
    getTreballador(dni:string):Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/treballador?dni='+dni);
    }
    getCategories():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/categories');
    }
    getGuardiesTreballador(dni:string):Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni);
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