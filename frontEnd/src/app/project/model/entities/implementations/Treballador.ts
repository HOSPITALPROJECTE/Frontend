export class Treballador {
    id!: number;
    dni!: string;
    rol!: string;
    datanaix!: Date;
    passwd!: string;

    constructor(id : number, dni :string, rol :string, datanaix : Date, passwd : string) {
       
        this.id = id;
        this.dni = dni;
        this.rol = rol;
        this.datanaix = datanaix;
        this.passwd = passwd;
    }
}