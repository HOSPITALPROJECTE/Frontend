import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-treballadors',
  templateUrl: './admin-treballadors.component.html',
  styleUrls: ['./admin-treballadors.component.css']
})
export class AdminTreballadorsComponent implements OnInit, AfterViewInit {
  filter_name: string = '';
  filter_dni: string = '';
  filter_select!: string;

  treballadors!:Array<any>
  categories!:Array<any>

  constructor(private router: Router, private httpClient:ATreballador) {
    this.httpClient.getTreballador().subscribe(
    data => {
      this.treballadors = data['resultat']['dades'];
    }); 
    this.httpClient.getCategories().subscribe(
      data => {
        this.categories = data['resultat']['dades'];
        console.log(this.categories[0]);
      }); 
  }


  ngOnInit(): void {
    this.setFilterSelect() // agafa el valor del select
    this.selectTreballador(); // acció al seleccionar un treballador
    this.btnsActions(); // accions per treballador ex: veure guardies
    this.filterTable(); // filtratje de la taula
  }


  /******************
     VISUAL ACTIONS 
  *******************/

  ngAfterViewInit(): void {
    console.log('aaaa')
    this.setFilterSelect() // agafa el valor del select
    this.selectTreballador(); // acció al seleccionar un treballador
    this.btnsActions(); // accions per treballador ex: veure guardies
    this.filterTable(); // filtratje de la taula
    console.log('aaaa')
  }
  setFilterSelect(){
    let select = document.querySelector('select')?.value;
    if (select!=null && select!='') this.filter_select = select;
    else this.filter_select = 'Infermeria'
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
  }
  btnSecondary(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.treballador'));
    });
  }
  filterTable(){
    let list = document.querySelectorAll('.treballador');
    document.querySelector('.filtres > button')?.addEventListener('click', () => {
      console.log('a')
      this.filterElements(list);
    });
  }
  filterElements(list:NodeListOf<Element>){
    console.log('b')
    console.log(list);
    list.forEach(l => {
      if(this.filterTrue(l)){l.classList.remove('hide'); console.log('ba')}
      else {l.classList.add('hide'); console.log('ba');}
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
