import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { ATreballador } from '../../services/api/treballador/ATreballador';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements AfterViewInit {
  unitats: Array<Array<string | Array<string | number>>> = this.setUnitats(); // == Array<Unitats>

  constructor(private router: Router, private elementRef: ElementRef , private httpRequest : ATreballador) { }

  setUnitats() {
    //[ nom:str, descripcio:str ,[torn:str, places:num, inscripcions:num, apuntat:bool]]
    return [['Unitat 1', 'Infermeria, reabilitació', ['mati', 2, 8, 0], ['tarda', 2, 6, 0]],
    ['Unitat 2', 'Infermeria, lesions greus', ['mati', 2, 5, 1], ['tarda', 3, 3, 0]],
    ['Unitat 3', 'Infermeria, lesions lleus', ['mati', 1, 10, 0], ['tarda', 2, 19, 0]]]
  }

  goToMonth(): void {
    this.router.navigate(['/month']);
  }

  // equivalent a js window.onload
  ngAfterViewInit() {
    this.selectUnitiOnClick(); // desplegar una unitat
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

  apuntarseGuardia(dni : string , id_guardia : string) {
    let dataObject = {
      "dni" : dni,
      "id_guardia" : id_guardia
    }
    this.httpRequest.apuntarseGuardia(dataObject).pipe(take(1) , catchError((err : any) =>{
          console.log(err)
          return throwError(()=>  new Error("Error en apuntar-se a guardia"))

    })).subscribe({
      next : () => {},
      error : (err : any) => {
        console.log("Error al fer el subscribe")
        console.log(err.error)
      },
      complete : () => {console.log("Correcte!!!")}
    }
    )
  }


}


