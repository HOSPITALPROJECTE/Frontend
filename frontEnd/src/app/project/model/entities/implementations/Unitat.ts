export class Unitat {
    nom!: string;
    num = 1;
    percentage!:number;

    constructor(tipus:string) {
        this.nom = tipus;
    }
    public sumNum(){this.num = this.num+1}

    public setPercentage(num:number){this.percentage = num}
}