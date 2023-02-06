import { Unitat } from "./Unitat";

export class Guardia {
    id!: number;
    dia!: Date;
    unitats! : Array<Unitat>;


    constructor(id : number, placesdispo : number, dia : Date , unitats : Array<Unitat>) {
        this.id = id;
        this.dia = dia;
        this.unitats = unitats;
    }
}