import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';
import { AFestiu } from 'src/app/project/services/api/festiu/AFestiu';

@Component({
  selector: 'app-admin-festius',
  templateUrl: './admin-festius.component.html',
  styleUrls: ['./admin-festius.component.css']
})
export class AdminFestiusComponent {
  mes:string ='Tots';
  dia!:Date;
  festius!:Array<any>;
  mesos:Array<string> = ['Tots','Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

  constructor(private router: Router, public http:ATreballador, public httpPut:AFestiu) {
    this.loadFestius();
  } 
  loadFestius(){
    this.http.getFestius().subscribe(
      data => {
        this.festius = (data as any)['resultat']['dades'];
    });
  }
  btnDesactivate(){
    this.httpPut.insertFestiu({dia:this.dataToString(this.dia),status:"eliminat"}).subscribe(data => {
      this.loadFestius();
      this.borrarSeleccio();
    });
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }
  borrarSeleccio(){
    document.querySelector('.btns')?.classList.remove('active');
    this.removeSelecions(document.querySelectorAll('.table_li'));
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

  filterElements(){
    let allLi = document.querySelectorAll('.table_li');
    allLi.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide');
      else l.classList.add('hide');
    })
  }
  filterTrue(element:Element){
    let mes = this.numMes(element)
    return mes;
  }

  numMes(element:Element){
    let num = this.mesos.indexOf(this.mes);
    let data = (element.children[0]?.textContent)?.slice(5,-3)
    let mes = true;
    if(data!=null){
      if(num != 0){
        if(parseInt(data, 10) != num) mes = false;
      }
    }
    return mes;
  }
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
  addFestiu(dia:string){
    this.httpPut.insertFestiu({dia:dia,estat:"actiu"}).subscribe(data => {
      this.loadFestius();
    });
  }
  changeDia(dia:Date){this.dia = dia;}
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "YYYY-MM-dd");
  }
}
