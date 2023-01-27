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
        return this.http.get('http://localhost:4000/api/data-access/treballadors', requestOptions);
    }
    getTreballador(dni:string):Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/treballador?dni='+dni, requestOptions);
    }
    getGuardiesTreballador(dni:string):Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni, requestOptions);
    }
    getAgendaTreballador(dni:string):Observable<any>{
        let data = this.getToday();
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getAgendaTreballador?dni='+dni+'&data='+data, requestOptions);
    }
    getHistorialTreballador(dni:string):Observable<any>{
        let data = this.getToday();
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getHistorialTreballador?dni='+dni+'&data='+data, requestOptions);
    }
    getToday(){   
        let date = new Date();
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`
    }
    getFestius(){
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getFestius', requestOptions);
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