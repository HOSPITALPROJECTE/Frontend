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
}