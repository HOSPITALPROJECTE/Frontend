export class Guardia {
    id!: number;
    placesdispo!: number;
    dia!: Date;


    constructor(id : number, placesdispo : number, dia : Date) {
       
        this.id = id;
        this.placesdispo = placesdispo;
        this.dia = dia;
    }
}