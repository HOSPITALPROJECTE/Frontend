import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ATreballador{
    
    constructor(private http:HttpClient){}

    requestOptions = this.createHeader();

    getTreballadors():Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/treballadors');
    }
    getTreballador(dni:string):Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/treballador?dni='+dni);
    }
    getCategories():Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/categories');
    }
    getUnitats(): Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/unitats');
    }
    getTorns() : Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/torns');
    }
    getGuardiesTreballador(dni:string):Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni);
    }
    obtenirGuardiesData(data : any){
        return this.http.post('http://localhost:4000/api/data-access/guardiesperdata' ,data,this.requestOptions)
    }

    // USER REQUESTS WITH TOKEN  \\
    getCategoriaTreballador():Observable<any>{
        return this.http.get('http://localhost:4000/api/user/categoria' , this.requestOptions);
    }
    apuntarseGuardia(data : any){
        return this.http.post('http://localhost:4000/api/user/apuntar-se' , data , this.requestOptions );
    }
    obtenirDiesAmbEstat(data : any) : Observable<any>{
        return this.http.post('http://localhost:4000/api/user/estatdies' ,data,this.requestOptions)
    }
    login(user : any): Observable<any> {
        return this.http.post('http://localhost:4000/api/user/login', user , this.requestOptions);
      }
    private createHeader(){

        let token = localStorage.getItem("hospital-accessToken")

        const header = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Acces-Control-Allow-Headers':'Origin, Content-Type, Accept,Authorization',
            'Authorization' : 'Bearer ' + token
        }
        return {headers: new HttpHeaders(header)};
    }

}