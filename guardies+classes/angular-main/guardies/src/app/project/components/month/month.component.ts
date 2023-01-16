import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Month } from '../../model/entities/implementations/Month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements AfterViewInit {
  month:Month;

  constructor(private router: Router,private elementRef: ElementRef) { 
    this.month = new Month('2022-6');
  }

  // equivalent a window.onload
  ngAfterViewInit() {
    this.addGuardies();
    this.addClickEvent_Guardies();
    this.showAllMonths();
  }

  setClassSeason(season:number){
    if (season == 1) return 'hivern';
    else if (season == 2) return 'primavera';
    else if (season == 3) return 'estiu';
    else return 'tardor';
  }
  addGuardies(){
    let dias = this.elementRef.nativeElement.querySelectorAll('.day');
    for (let dia = 0; dia < dias.length; dia++) {
      if(this.month.days[dia].status == 1) dias[dia].classList.add('festivo','applyed')
      else if(this.month.days[dia].status == 2) dias[dia].classList.add('festivo','assigned')
    }
  }

  showAllMonths() {
    let months = document.querySelector('.llistaMesos');
    document.querySelector('.btn_viewAllMonths')?.addEventListener('click', () => {
      if(months?.classList.contains('active'))months?.classList.remove('active')
      else months?.classList.add('active')
    });
  }
  /* NAVEGACIO */
  addClickEvent_Guardies(){
    let elementos = this.elementRef.nativeElement.querySelectorAll('.festivo');

    for (let i = 0; i < elementos.length; i++) {
      elementos[i].addEventListener('click', () => {
        this.goToDay();
      });
    }
  }
  goToDay(){
    this.router.navigate(['/day']);
  }
}
