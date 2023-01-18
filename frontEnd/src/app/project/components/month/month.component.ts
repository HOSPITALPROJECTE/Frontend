import { AfterViewInit, Component, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Month } from '../../model/entities/implementations/Month';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements AfterViewInit {
  month:Month;
  months:Array<string> = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

  constructor(private router: Router,private elementRef: ElementRef) {
    this.month = new Month('2022-6');
  }

  getDate(year:number, month:string){
    let mes = this.months.indexOf(month) + 1;
    return year + '-' + mes.toString();
  }
  // equivalent a window.onload
  ngAfterViewInit() {
    this.addFuncionalities(); // funcio asyncrona per afegir events al DOM
    this.showAllMonths(); // Permet escollir un mes qualsevol
    this.onChangeMonth(); //cambiar mes
  }
  addFuncionalities(){
    setTimeout(() => {
      this.addGuardies(); // afegeix les guardies al mes
      this.addClickEvent_Guardies(); // onclik -> guardia
    }, 0);
  }

  setClassSeason(season:number){
    if (season == 1) return 'hivern';
    else if (season == 2) return 'primavera';
    else if (season == 3) return 'estiu';
    else return 'tardor';
  }
  /* PENDENT DE MODIFICAR addGuardies
  Ha d'agafar les guardes actives/apuntades per treballador
  No les ha de posar per numero de dia sino per data
  */
  addGuardies(){ 
    let dias = this.elementRef.nativeElement.querySelectorAll('.day');
    for (let dia = 0; dia < dias.length; dia++) {
      if(this.month.days[dia].status == 1) dias[dia].classList.add('festivo','applyed')
      else if(this.month.days[dia].status == 2) dias[dia].classList.add('festivo','assigned')
    }
  }

  showAllMonths() {
    document.getElementById('btn_allMonths')?.addEventListener('click', () => document.getElementById('allMonths_box')?.classList.add('active')); // btn.click => show all
    document.querySelector('#allMonths_box .exitMonths')?.addEventListener('click', () => document.getElementById('allMonths_box')?.classList.remove('active')); // btn.click => show all
    // click mes concret
    document.querySelectorAll('#allMonths_box .month_list .month')?.forEach(month => month.addEventListener('click', () => {
      let mes = month.getAttribute('date-filter');
      if(mes!=null)this.month = new Month(mes);
      document.getElementById('allMonths_box')?.classList.remove('active');
      this.addFuncionalities();
    }));
  }

  onChangeMonth(){
    let boto = document.querySelectorAll('#change_month > i');
    boto.forEach(b => b.addEventListener('click', () => {
      // comprovo si es mou un mes endavant o enrrera
      let sumar = true;
      if(b == boto[0]) sumar = false;
      this.month = new Month(this.setNewMonth(sumar));

      this.addFuncionalities();
    }))
  }
  setNewMonth(sumar:boolean){
    let any = parseInt(this.month.id.substring(0,4));
    let mes = parseInt(this.month.id.substring(5));
    if(sumar){
      // sumar mes
      mes = mes + 1;
      if(mes == 13){
        mes = 1;
        any = any + 1
      }
    }else{
      // restar mes
      mes = mes -1;
      if(mes == 0){
        mes = 12;
        any = any - 1
      }
    }
    return any.toString()+'-'+mes.toString();
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
