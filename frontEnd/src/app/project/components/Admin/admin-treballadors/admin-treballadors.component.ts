import { Component, OnInit, ViewChildren, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-treballadors',
  templateUrl: './admin-treballadors.component.html',
  styleUrls: ['./admin-treballadors.component.css']
})
export class AdminTreballadorsComponent implements AfterViewInit {
  filter_name: string = '';
  filter_dni: string = '';
  filter_select!: string;

  treballadors!:Array<any>
  categories!:Array<any>
  
  @ViewChild('elementId') elementRef: ElementRef | undefined;
  constructor(private router: Router, private httpClient:ATreballador) {
    this.httpClient.getTreballadors().subscribe(
    data => {
      this.treballadors = data['resultat']['dades'];
    }); 
    this.httpClient.getCategories().subscribe(
      data => {
        this.categories = data['resultat']['dades'];
      }); 
  }

  ngAfterViewInit(): void {
    this.btnsActions(); // accions per treballador ex: veure guardies
  }
  setFilterSelect(){
    let select = document.querySelector('select')?.value;
    if (select!=null && select!='') this.filter_select = select;
    else this.filter_select = 'Infermeria'
  }
  selectTreballador(li:Element){
    let ul = li.parentNode?.querySelectorAll('.table_li');
    if(ul != null) this.removeSelecions(ul);
    li.classList.add('active');

    this.actionsWithTreballador();
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }
  actionsWithTreballador(){
    document.querySelector('.btns')?.classList.add('active');
    document.querySelector('#exit')?.classList.add('hide');
  }

  btnsActions(){
    this.btnSecondary();
    this.btnPrimary();
  }
  btnSecondary(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.table_li'));
    });
  }
  btnPrimary(){
    document.querySelector('.btn_primary')?.addEventListener('click', () => {
      let dni = document.querySelector(".table_li.active > p[name='dni']")?.textContent;
      if(dni != null)
        this.goToGuardiesTreballador(dni)
  })
  }
  filterTable(){
    let list = document.querySelectorAll('.table_li');
    document.querySelector('.filtres > button')?.addEventListener('click', () => {
      this.filterElements(list);
    });
  }
  filterElements(list:NodeListOf<Element>){
    list.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide');
      else l.classList.add('hide');
    });
  }
  filterTrue(element:Element){
    let select = element.querySelector("p[name='cat']")?.textContent == this.filter_select;
    let name = element.querySelector("p[name='nom']")?.textContent?.includes(this.filter_name);
    let dni = element.querySelector("p[name='dni']")?.textContent?.includes(this.filter_dni);
    return select && dni && name;
  }


	setSelectFilter(value:string): void {
		this.filter_select = value;
	}
	setNomFilter(value:string): void {
		this.filter_name = value;
	}
	setDniFilter(value:string): void {
		this.filter_dni = value;
	}
  /* NAVEGACIO */
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
  goToGuardiesTreballador(dni:string){
    this.router.navigate(['/admin-treballadors-guardies', dni]);
  }

}
