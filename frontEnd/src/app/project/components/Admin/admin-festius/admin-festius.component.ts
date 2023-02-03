import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';
import { AFestiu } from 'src/app/project/services/api/festiu/AFestiu';
import { AGuardia } from 'src/app/project/services/api/guardia/AGuardia';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-festius',
  templateUrl: './admin-festius.component.html',
  styleUrls: ['./admin-festius.component.css']
})
export class AdminFestiusComponent {
  loading = false;
  mes:string ='Tots';
  dia!:Date;
  festius!:Array<any>;
  mesos:Array<string> = ['Tots','Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

  constructor(private router: Router, public http:ATreballador, public httpPut:AFestiu, public hhtpG:AGuardia) {
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
  selectAll(){
    document.querySelectorAll('.table_li').forEach(li => li.classList.add('active'));
  }
  borrarSeleccio(){
    document.querySelector('.btns')?.classList.remove('active');
    this.removeSelecions(document.querySelectorAll('.table_li'));
  }
  selectDay(li:Element){
    if(li.classList.contains('active')) {
      li.classList.remove('active');
      let ul = document.querySelectorAll('.table_li.active');
      if( ul?.length == 0) this.borrarSeleccio();
    }else{
      let ul = li.parentNode?.querySelectorAll('.table_li');
      //if(ul != null) this.removeSelecions(ul);
      li.classList.add('active');

      this.actionsWithTreballador();
    }
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

  async createGuardies(){
    let guardiesToCreate:Array<string> = [];
    let list = document.querySelectorAll('.table_li.active')
    list.forEach(data => {
      let date = data.textContent;
      if(date!= null){
        if (date == 'Diumenges') guardiesToCreate = this.addAllSundays(guardiesToCreate);
        guardiesToCreate.push(date)
      }
    });
    this.loading = true;
    await lastValueFrom(this.hhtpG.createGuardia(guardiesToCreate))
    console.log('aaa')
    this.loading = false;
    console.log('bbb')
    this.notifyUser()
  }

  addAllSundays(dates:Array<string>){
    const year = 2023;
    const date = new Date(year, 0, 1);

    while (date.getFullYear() === year) {
        if (date.getDay() === 0) {
          let data = this.dataToString(new Date(date))
          if(data!=null) dates.push(data);
        }
        date.setDate(date.getDate() + 1);
    }
    return dates
  }

  notifyUser(){ console.log('aaaa')}


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
