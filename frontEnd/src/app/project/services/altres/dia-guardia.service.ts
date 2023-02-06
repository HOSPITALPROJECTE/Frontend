import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaGuardiaService {

  private dia! : string;

  constructor() {
    this.dia = "";
   }


   // pasar aixo a local storage
  setDia(dia : string){
    this.dia = dia;
  }

  getDayName()
  {
      var date = new Date(this.dia);
      let nomDia = date.toLocaleDateString("ca-ES", { weekday: 'long' });
          nomDia = nomDia.charAt(0).toUpperCase() + nomDia.slice(1);
      let nomMes =  date.toLocaleDateString("ca-ES", { month: 'long' });
          nomMes = nomMes.charAt(0).toUpperCase() + nomMes.slice(1);
      
      return `${nomDia}, ${date.getDate()} de ${nomMes} ${date.getFullYear()}`
  }
}
