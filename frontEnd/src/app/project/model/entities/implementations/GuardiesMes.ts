import { GuardiaTreballador } from "./GuardiaTreballador";


export class GuardiesMes{
    nom!:string;
    guardies:Array<GuardiaTreballador> = [];
    
    constructor(nom:string, guardia:GuardiaTreballador) {
        this.nom = nom;
        this.guardies.push(guardia)
    }
}
