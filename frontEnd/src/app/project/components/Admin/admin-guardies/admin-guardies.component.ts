import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-guardies',
  templateUrl: './admin-guardies.component.html',
  styleUrls: ['./admin-guardies.component.css']
})
export class AdminGuardiesComponent{

  data!:Array<string>;
  unitats:Array<string> =['Unitat 1','Unitat 2','Unitat 3', 'Unitat 4']
  unitat:string='Unitat 1';
  categories:Array<string> =['Infermeria','TCAI']
  categoria:string='Infermeria';
  torns!:Array<any>;
  places!:Array<any>;

  guardies!:Array<any>;

  constructor(private router: Router, private httpClient:ATreballador, private route: ActivatedRoute) {
    this.httpClient.getGuardies().subscribe(
      data=> {
      this.guardies = data['resultat']['dades'];
    })
  }
  setFilterSelectUnitat(){
    let select = document.querySelector('select')?.value[0];
    if (select!=null) this.unitat = select;
    else this.unitat = 'Unitat 1';
  }

  setFilterSelectCategoria(){
    let select = document.querySelector('select')?.value[1];
    if (select!=null) this.categoria = select;
    else this.categoria = 'Infermeria';
  }
  removeSelecions(guardies:NodeListOf<Element>){
    guardies.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }
  actionsWithGuardia(){
    document.querySelector('.btns')?.classList.add('active');
    document.querySelector('#exit')?.classList.add('hide');
  }

  filterElements(){
    let list = document.querySelectorAll('.table_li');
    list.forEach(l => {
      if(this.filterTrue(l)){l.classList.remove('hide'); }
      else l.classList.add('hide');
  
    });
  }
  filterTrue(element:Element){
    /*let data = element.querySelector("p[class='dia']")?.textContent == this.data;*/
    let unitat = element.querySelector("p[class='unitat']")?.textContent == this.unitat;
    let categoria = element.querySelector("p[class='categoria']")?.textContent == this.categoria;
    return  unitat && categoria;
  }

  setSelectFilterDate(data:any): void {
		this.data = data;
	}
  setSelectFilterCategoria(categoria:string): void {
		this.categoria = categoria;
	}
  setSelectFilterUnitat(unitat:string): void {
		this.unitat = unitat;
	}
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "dd-MM-yyyy");
  }
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
}
