import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'express';
import { Observable } from 'rxjs';
import { Guardia } from 'src/app/project/model/entities/implementations/Guardia';

@Injectable({
    providedIn: 'root'
})

export class AGuardia{
    
    constructor(private http:HttpClient){}
    
    getPlantilles():Observable<any>{
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/getPlantilla', requestOptions);
    }
    savePlantilla(plantilla:Guardia){
        const requestOptions = this.createHeader();
        return this.http.post('http://localhost:4000/api/data-access/savePlantilla', plantilla, requestOptions);
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