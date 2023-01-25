import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AFestiu{
    
    constructor(private http:HttpClient){}


    updateFestiu(data:any){
        const requestOptions = this.createHeader();
        return this.http.put('http://localhost:4000/api/data-access/UpdateFestius',data, requestOptions);      
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