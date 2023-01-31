import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class Token{
    dni!:string;
    categoria!:string;
    rol!:string;

    constructor(dni : string, categoria : string, rol : string) {
        this.dni = dni;
        this.categoria = categoria;
        this.rol = rol;
    }

    getDni(){
        return this.dni;
    }

    getCategoria(){
        return this.categoria;
    }

    getRol(){
        return this.rol;
    }
/*
    verificarToken():Observable<any> {
        const token=localStorage.getItem('hospital-accessToken');
        
        if (token!=null && tokenValid(token)) return of({});  
        
        const headerDict = {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Acces-Control-Allow-Headers':'*',
            }

        const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
            };

        try {
            return this.http.get<String>(`${environment.urlApi}login`,requestOptions)
        } catch (e) {
            return of({});;
        }
    }
}

function tokenValid(token: any):boolean {
    const caduca:number = (JSON.parse(token)).expireAt;
    const prorroga_token:number = 50; // Percentatge. (50 implica a la meitat de la caducitat. Aquest paràmetre ha de coincidir amb l'especificat a Params.php (API)
    const limit = caduca * prorroga_token/100;
    const ara:number = (new Date).getTime()/1000 // Eliminem a partir de dècimes de segon
    return limit>ara;
}
*/}