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
        const requestOptions = this.createHeader();
        return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni, requestOptions);
    }
    getTreballadorsGuardia(id_guardia:string):Observable<any>{
        const requestOptions = this.createHeader();
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

    assignarEstatGuardia(dni_treballador:string){
        const requestOptions = this.createHeader();
        console.log('http://localhost:4000/api/data-access/assignarEstatGuardia?dni_treballador='+dni_treballador)
        return this.http.post('http://localhost:4000/api/data-access/assignarEstatGuardia?dni_treballador='+dni_treballador,requestOptions);
    }
    
    desAssignarEstatGuardia(dni_treballador:string){
        const requestOptions = this.createHeader();
        console.log('http://localhost:4000/api/data-access/desAssignarEstatGuardia?dni_treballador='+dni_treballador)
        return this.http.post('http://localhost:4000/api/data-access/desAssignarEstatGuardia?dni_treballador='+dni_treballador,requestOptions);
        //return this.http.get('http://localhost:4000/api/data-access/guardiestreballador?dni='+dni);
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
    
    
    /*login(user : any): Observable<any> {
        return this.http.post('http://localhost:4000/api/user/login', user , this.requestOptions);
      }*/
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