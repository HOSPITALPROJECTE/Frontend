import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardiaTreballador } from '../../model/entities/implementations/GuardiaTreballador';
import { GuardiesMes } from '../../model/entities/implementations/GuardiesMes';
import { ATreballador } from '../../services/api/treballador/ATreballador';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit,AfterViewInit {
  dni:string = '111111111E'; // get from TOKEN
  result!:Array<any>;
  guardies:Array<GuardiesMes> = [];
  torns!:any;

  constructor(private router: Router, private httpClient:ATreballador) {
    this.httpClient.getAgendaTreballador(this.dni).subscribe(
    data => {
      this.result = data['resultat']['dades'];
      this.result.forEach(g => {
        let guardia = new GuardiaTreballador(g.data_guardia, g.unitat, g.torn, g.estat_guardia);
        let index = 0;
        let exit = true;
        while(index < this.guardies.length && exit){
          if(this.guardies[index].nom == guardia.mes)exit = false;
          index++;
        }
        if(!exit) this.guardies[index-1].guardies.push(guardia);
        else this.guardies.push(new GuardiesMes(guardia.mes, guardia));
      });
    });
    this.httpClient.getTorns().subscribe(
    data => {
      this.torns = data;
      this.torns = this.torns['resultat']['dades'];
    });
  }

  ngOnInit(): void {
  }
  /* Visual Actions */
  ngAfterViewInit(): void {
    this.confirmDelete();
  }
  confirmDelete() {
    //this.toTrashEventListener();
    this.trashConfirmButtons();
    this.goToHistorial();
  }
  /*toTrashEventListener(): void {
    let day = document.querySelectorAll('.dayAction');
    day.forEach(day => day.addEventListener('click', () => {
      this.addDayDataToConfrimWindow(day.parentNode);
      this.showWindow();
    }));
  }*/
  toTrashEventListener(day:HTMLElement): void {
    this.addDayDataToConfrimWindow(day.parentNode);
    this.showWindow();
  }
  addDayDataToConfrimWindow(day: any) {
    let data = day.querySelector('.num')?.textContent+', '+day.parentNode.getAttribute('month-data');
    let torn = day.querySelector('.place label')?.textContent;
    
    let window = document.querySelector("#window_box > .data");
    let data2 = window?.querySelector("p[name='dia']");
    if (data2 != null) data2.textContent = data;
    data2 = window?.querySelector("p[name='torn']");
    if (data2 != null) data2.textContent = torn;
  }

  showWindow() {document.querySelector("#confirm_window")?.classList.remove('hide');}
  hideWindow() {document.querySelector("#confirm_window")?.classList.add('hide');}
  trashConfirmButtons(){
    document.querySelector('.btn_eliminar')?.addEventListener('click', () => {
      // code delete Guardia
      this.hideWindow();
    })
    document.querySelector('.btn_cancel')?.addEventListener('click', () => this.hideWindow());
  }

  goToHistorial() {
    let inicialX = 0;
    let finalX = 0;
    
    document.getElementById('body')?.addEventListener('touchmove', (event) => {
      finalX = event.touches[0].clientX;
      if(inicialX + 75 < finalX) this.router.navigate(['/historial']);;
    });
    
    document.getElementById('body')?.addEventListener('touchstart', (event) => {
      inicialX = event.touches[0].clientX;
    });
  }
}
