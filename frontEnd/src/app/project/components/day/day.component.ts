import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { DiaGuardiaService } from '../../services/altres/dia-guardia.service';
import { ATreballador } from '../../services/api/treballador/ATreballador';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit , AfterViewInit {

  torns = this.carregarTorns();
  unitats = JSON.parse(<string>localStorage.getItem("unitats"))
  guardiesAssigandes = JSON.parse(<string>localStorage.getItem("guardiesAssignades"))
  categoriaTreballador = localStorage.getItem("categoria");
  guardies!: Array<any>;
  nomDia = (localStorage.getItem("nomDia") === null) ? this.diaGuardia.getDayName() : localStorage.getItem("nomDia");

  constructor(private diaGuardia: DiaGuardiaService, private router: Router, private elementRef: ElementRef, private httpRequest: ATreballador) { }
  ngAfterViewInit(): void {
    this.selectUnitiOnClick(); // desplegar una unitat
  }
  ngOnInit(): void {
    this.getGuardiesOrdenades()
    if (localStorage.getItem("nomDia") === null) {
      localStorage.setItem("nomDia", <string>this.nomDia)
    }

  }

  carregarTorns() {
    let torns: Array<string> = [];
    this.httpRequest.getTorns().pipe(take(1), catchError((err: any) => {
      return throwError(() => { return new Error(err) })
    })).subscribe((res) => {
      let tornsRes = <Array<any>>res.resultat.dades
      tornsRes.forEach((torn: any) => {
        torns.push(<string>torn.nom)
      })
    })
    return torns;
  }

  retornaArrayGuardies(nomUnitat : string){
      let guardies : Array<any> = [];
      this.guardies.forEach(unitat =>{
        if(unitat.nomUnitat == nomUnitat){
             guardies = <Array<any>> unitat.guardies
        }
      })
      return guardies;
  }

  getGuardiesOrdenades() {
    let guardiesDeStorage = this.guardiesDeStorage();

    this.guardies = guardiesDeStorage.sort((a, b) => {
      // funció per ordenar guardies de unitat 
      let numeroUnitatA = (<string>a.nomUnitat).split(" ")[1];
      let numeroUnitatB = (<string>b.nomUnitat).split(" ")[1];

      if((<string> a.nomUnitat) == "Urgencies" )
        return 1
      else if ((<string> b.nomUnitat) == "Urgencies")
        return -1
      

      if (parseInt(numeroUnitatA) < parseInt(numeroUnitatB)) return -1
      
      if (parseInt(numeroUnitatA) > parseInt(numeroUnitatB)) return  1


        return 0
    })

}

guardiesDeStorage() {
  let values: Array<any> = [],
    keys = Object.keys(localStorage),
    i = keys.length,
    index = 0;

  while (i--) {
    let clauGuardies = keys[i].split("_");
    if (clauGuardies[0] == "unitatClau") {
      values[index] = JSON.parse(<string>localStorage.getItem(keys[i]));
      index++
    }
  }
  return values;
}

goToMonth(): void {
  localStorage.removeItem("nomDia");
  this.router.navigate(['/month']);

}

selectUnitiOnClick() {
  let elementos = this.elementRef.nativeElement.querySelectorAll('.unitat');

  for (let i = 0; i < elementos.length; i++) {
    elementos[i].addEventListener('click', () => {
      this.deleteActiveClass(elementos, i);
      this.updateElementClass(elementos[i].parentNode);
    });
  }

  this.cancelInscription(); // cancelar.click => plegar una unitat
}
cancelInscription() {
  let btn = document.querySelector('.btn_secondary')
  btn?.addEventListener('click', () => {
    btn?.parentElement?.parentElement?.parentElement?.classList.remove('active');
  })
}
updateElementClass(element: any) {
  if (element.classList.contains('active')) { element.classList.remove('active'); }
  else { element.classList.add('active'); }
}
deleteActiveClass(elementos: any, element: number) {
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].parentNode.classList.contains('active') && elementos[i] != elementos[element]) {
      elementos[i].parentNode.classList.remove('active')
    }
  }
}

apuntarseGuardia(id_guardia: string) {


  this.httpRequest.apuntarseGuardia({id_guardia : id_guardia}).pipe(take(1), catchError((err: any) => {
    return throwError(() => new Error("Error en apuntar-se a guardia"))

  })).subscribe({
    next: () => { },
    error: (err: any) => {
      console.log(err.error)
    },
    complete: () => { console.log("Correcte!!!") }
  }
  )
}


cancelarGuardia(id_guardia: string) {

  this.httpRequest.cancelarGuardia({id_guardia : id_guardia}).pipe(take(1), catchError((err: any) => {
    return throwError(() => new Error("Error en cancelar guardia"))

  })).subscribe({
    next: () => { },
    error: (err: any) => {
      console.log(err.error)
    },
    complete: () => { console.log("Correcte!!!") }
  }
  )
}

getClasseUnitat(unitatNom : string){

  let unitatsAmbEstat = <Array<any>>JSON.parse(<string>localStorage.getItem("unitatsAmbEstat")).dades;
  let classe = {}; 
  unitatsAmbEstat.forEach(unitat => {
    
      if(unitatNom == unitat.unitat){
         classe = (unitat.estat_guardia == "assignat") ? {'assignat' : true} : {'apuntat' : true};
      }
  });

  return classe;
}


}


