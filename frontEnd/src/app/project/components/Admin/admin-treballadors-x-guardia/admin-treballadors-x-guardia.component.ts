import { AfterViewInit, Component,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from '../../../services/api/treballador/ATreballador';
import { AUtils } from '../../../services/api/utils/AUtils';

@Component({
  selector: 'app-admin-treballadors-x-guardia',
  templateUrl: './admin-treballadors-x-guardia.component.html',
  styleUrls: ['./admin-treballadors-x-guardia.component.css']
})
export class AdminTreballadorsXGuardiaComponent implements AfterViewInit{
  filter_name: string = '';
  filter_dni: string = '';
  filter_select: string = 'Totes';
  apunt:boolean = false

  treballadors!:Array<any>
  categories!:Array<any>
  id!:string;
  isAssigned:boolean=false;
  isApuntat:boolean=false;

  constructor(private router: Router, private httpClient:ATreballador,private route: ActivatedRoute,private httpUtils:AUtils) {
    this.route.params.subscribe(params => {
      this.id=params['id'];    
      this.httpClient.getTreballadorsGuardia(this.id).subscribe(
        data => {
      this.treballadors = data['resultat']['dades'];
      })
      this.httpUtils.getCategories().subscribe(
        data => {
          this.categories = data['resultat']['dades'];
      })})
  }

  ngAfterViewInit(): void {
    this.btnsActions(); 
  }

  selectTreballador(li:Element){
    let ul = li.parentNode?.querySelectorAll('.table_li');
    if(ul != null) this.removeSelecions(ul);
    li.classList.add('active');

    this.actionsWithTreballador();
  }

  actionsWithTreballador(){
    document.querySelector('.btns')?.classList.add('active');
    document.querySelector('#exit')?.classList.add('hide');
  }

  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }

  btnsActions(){
    this.btnTerciary();
    this.btnSecondary();
    this.btnPrimary();
  }

  btnPrimary(){
    document.querySelector('.btn_primary')?.addEventListener('click', () => {
      let estat:any = document.querySelector(".table_li.active > p[name='estat']")?.textContent;
      let dni_treballador:any = document.querySelector(".table_li.active > p[name='dni']")?.textContent;
      if(estat!='assignat'&& dni_treballador!=null){
        this.assignarEstatGuardia(dni_treballador);
      }else{
        this.isAssigned=true;
      }
    })
  }
  
  assignarEstatGuardia(dni_treballador:string){
  
    this.httpClient.assignarEstatGuardia(dni_treballador).subscribe({
      next: data => {
      },
      error:error => {
        console.error('Error updating value');
      }
    })
  }  

  btnTerciary(){
    document.querySelector('.btn_terciary')?.addEventListener('click', () => {
      let estat:any = document.querySelector(".table_li.active > p[name='estat']")?.textContent;
      let dni_treballador:any = document.querySelector(".table_li.active > p[name='dni']")?.textContent;
      if(estat!='apuntat'&& dni_treballador!=null){
        this.desAssignarEstatGuardia(dni_treballador);
      }else{
        this.isApuntat=true;
      }
    })
  }

  desAssignarEstatGuardia(dni_treballador:string){
  
    this.httpClient.desAssignarEstatGuardia(dni_treballador).subscribe({
      next: data => {
      },
      error:error => {
        console.error('Error updating value');
      }
    })
  }  

  btnSecondary(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.table_li'));
    });
  }
  filterTable(){
    let list = document.querySelectorAll('.table_li');
      this.filterElements(list);
  }
  filterElements(list:NodeListOf<Element>){
    list.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide');
      else l.classList.add('hide');
    });
  }
  filterTrue(element:Element){
    let select = element.querySelector("p[name='cat']")?.textContent == this.filter_select  || this.filter_select == 'Totes';
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
  goBack(){
    this.router.navigate(['/admin-guardies']);
  }

  goToTreballadorsGuardia(dni_treballador:string){
    this.router.navigate(['/admin-treballadors-x-guardia', dni_treballador]);
  }
}


