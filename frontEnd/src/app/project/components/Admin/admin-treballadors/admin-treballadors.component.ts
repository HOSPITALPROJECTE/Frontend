import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-treballadors',
  templateUrl: './admin-treballadors.component.html',
  styleUrls: ['./admin-treballadors.component.css']
})
export class AdminTreballadorsComponent implements OnInit, AfterViewInit {
  filter_name: string = '';
  filter_dni: string = '';
  filter_select!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setFilterSelect()
    this.selectTreballador(); // acció al seleccionar un treballador
    this.btnsActions(); // accions per treballador ex: veure guardies
    this.filterTable(); // filtratje de la taula
  }
  setFilterSelect(){
    let select = document.querySelector('select')?.value;
    if (select!=null) this.filter_select = select;
    else this.filter_select = '';
  }
  selectTreballador(){
    let treballadors =  document.querySelectorAll('.treballador');
    treballadors?.forEach(li => li.addEventListener('click', () => {
      this.removeSelecions(treballadors);
      li.classList.add('active');

      this.actionsWithTreballador();
    }))
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => t.classList.remove('active'));
  }
  actionsWithTreballador(){
    document.querySelector('.btns')?.classList.add('active');
  }

  btnsActions(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.treballador'));
    });
  }
  filterTable(){
    let list = document.querySelectorAll('.treballador');
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

}
