export class Unitat {
    nom!: string;
    placesMati! : number; 
    inscripcionsMati! : number;
    placesNit! : number;
    inscripcionsNit! : number;

    constructor(nom :string , placesMati : number , inscripcionsMati : number , placesNit : number , inscripcionsNit : number) {
        this.nom = nom;
        this.placesMati = placesMati;
        this.inscripcionsMati = inscripcionsMati;
        this.placesNit = placesNit;
        this.inscripcionsNit = inscripcionsNit;
    }

}