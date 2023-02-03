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
    getTreballadorsGuardia(id_guardia:string):Observable<any>{
        const requestOptions = this.createHeader();
        console.log('http://localhost:4000/api/data-access/treballadors_x_guardia?id_guardia='+id_guardia);
        return this.http.get('http://localhost:4000/api/data-access/treballadors_x_guardia?id_guardia='+id_guardia, requestOptions);
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

    getDiaAlCapDunAny(){
        let date = new Date();
        let year = date.getFullYear()+1;
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`
    }

    getGuardies():Observable<any>{
        let primer_dia = this.getToday();
        let ultim_dia=this.getDiaAlCapDunAny();
        const requestOptions= this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getGuardiesMesAny?primer_dia='+primer_dia+'&ultim_dia='+ultim_dia,requestOptions)
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