import { Unitat } from "./Unitat";

export class Guardia {
    unitat!:string;
    torn!:string;
    categoria!:string;
    places!:number;

    constructor(unitat:string,torn:string,categoria:string,places:number) {
       this.unitat = unitat;
       this.torn =torn;
       this.categoria = categoria;
       this.places = places;
    }
}