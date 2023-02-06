export class Unitat {
    nom!: string;
    num = 1;
    percentage!:number;

    constructor(tipus:string) {
        this.nom = tipus;
    }
    public sumNum(){this.num = this.num+1}

    public setPercentage(num:number){this.percentage = num}
    placesMati! : number; 
    inscripcionsMati! : number;
    placesNit! : number;
    inscripcionsNit! : number;

/*    constructor(nom :string , placesMati : number , inscripcionsMati : number , placesNit : number , inscripcionsNit : number) {
        this.nom = nom;
        this.placesMati = placesMati;
        this.inscripcionsMati = inscripcionsMati;
        this.placesNit = placesNit;
        this.inscripcionsNit = inscripcionsNit;
    }*/

}