import { DatePipe } from "@angular/common";
import { IGuardiaTreballador } from "../interfaces/IGuardiaTreballador";

export class GuardiaTreballador implements IGuardiaTreballador{
    mes!: string;
    dia!: string;
    unitat!: string;
    torn!: string;
    estatGuardia!: string;


    constructor(data:Date, unitat:string, torn:string, estatGuardia:string){
        this.getMes(data);
        this.getDayNum(data);
        this.unitat = unitat;
        this.torn = torn;
        this.estatGuardia = estatGuardia;
    }

    private getDayNum(data:Date){
        let day =  new DatePipe("en-US").transform(data, "dd");
        if(day!=null) this.dia =  day;
      }
    private getMes(data:Date){
        let mesos = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];
        let num = new DatePipe("en-US").transform(data, "MM");
        if(num != null) this.mes = mesos[parseInt(num)-1]
      }
}

