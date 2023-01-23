import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit,AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /* Visual Actions */
  ngAfterViewInit(): void {
    this.confirmDelete();
  }
  confirmDelete() {
    this.toTrashEventListener();
    this.trashConfirmButtons();
    this.goToHistorial();
  }
  toTrashEventListener(): void {
    let day = document.querySelectorAll('.dayAction');
    day.forEach(day => day.addEventListener('click', () => {
      this.addDayDataToConfrimWindow(day.parentNode);
      this.showWindow();
    }));
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
