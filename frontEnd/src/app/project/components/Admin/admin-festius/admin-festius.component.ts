import { DatePipe, NumberFormatStyle } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';
import { AFestiu } from 'src/app/project/services/api/festiu/AFestiu';

@Component({
  selector: 'app-admin-festius',
  templateUrl: './admin-festius.component.html',
  styleUrls: ['./admin-festius.component.css']
})
export class AdminFestiusComponent implements AfterViewInit {
  estat:string ='actiu';
  mes:string ='Tots';
  festius!:Array<any>;
  estats:Array<string> = ['actiu', 'eliminat'];
  mesos:Array<string> = ['Tots','Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

  constructor(private router: Router, private http:ATreballador, private httpPut:AFestiu) {
    http.getFestius().subscribe(
      data => {
        this.festius = (data as any)['resultat']['dades'];
    });
    httpPut.updateFestiu(['2023-04-07','eliminat']).subscribe(data => {
      console.log(data);
    });
   } 

  ngAfterViewInit(): void {
    this.btnsActions();
  }
  btnsActions(){
    this.btnActivate();
    this.btnDesactivate();
    this.btnQuit();
  }
  btnActivate(){
  }
  btnDesactivate(){
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }
  btnQuit(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.table_li'));
    });
  }
  selectDay(li:Element){
    let ul = li.parentNode?.querySelectorAll('.table_li');
    if(ul != null) this.removeSelecions(ul);
    li.classList.add('active');

    this.actionsWithTreballador();
  }
  actionsWithTreballador(){
    document.querySelector('.btns')?.classList.add('active');
    document.querySelector('#exit')?.classList.add('hide');
  }

  setMes(mes:string){this.mes = mes;}
  setEstat(estat:string){this.estat = estat;}

  filterElements(){
    let allLi = document.querySelectorAll('.table_li');
    allLi.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide');
      else l.classList.add('hide');
    })
  }
  filterTrue(element:Element){
    let mes = this.numMes(element)
    let estat = element.querySelector("p[name='estat']")?.textContent?.includes(this.estat);
    return estat && mes;
  }

  numMes(element:Element){
    let num = this.mesos.indexOf(this.mes);
    let data = (element.children[0]?.textContent)?.slice(5,-3)
    let mes = true;
    if(data!=null){
      if(parseInt(data) != 0){
        if(parseInt(data, 10) != num) mes = false;
      }
    }
    return mes;
  }
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "YYYY-MM-dd");
  }
}
