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
    getGuardiesTreballador(dni:string):Observable<any>{
        return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni);
    }

    apuntarseGuardia(data : any){
        return this.http.post('http://localhost:4000/api/user/apuntar-se' , data , this.requestOptions );
    }

    obtenirGuardiesAmbEstat(){
        return this.http.get('http://localhost:4000/api/user/estatguardies' , this.requestOptions)
    }

    login(user : any): Observable<any> {
        return this.http.post('http://localhost:4000/api/user/login', user , this.requestOptions);
      }
    private createHeader(){

        const header = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Acces-Control-Allow-Headers':'Origin, Content-Type, Accept,Authorization',
            'Authorization' : 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiIxMTExMTExMTFCIiwiY2F0ZWdvcmlhIjoiSW5mZXJtZXJpYSIsImlhdCI6MTY3NDU4NjU5NiwiZXhwIjoxNjc0NTg3NDk2fQ.6t85VDDBPc7ZVrdgWqZG4rcCNYS-jKoMywAUtGxYU4k'
        }
        return {headers: new HttpHeaders(header)};
    }

}