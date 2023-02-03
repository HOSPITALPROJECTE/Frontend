import { Component,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from '../../services/api/treballador/ATreballador';
import { AUtils } from '../../services/api/utils/AUtils';

@Component({
  selector: 'app-admin-treballadors-x-guardia',
  templateUrl: './admin-treballadors-x-guardia.component.html',
  styleUrls: ['./admin-treballadors-x-guardia.component.css']
})
export class AdminTreballadorsXGuardiaComponent{
  filter_name: string = '';
  filter_dni: string = '';
  filter_select: string = 'Totes';
  apunt:boolean = false

  treballadors!:Array<any>
  categories!:Array<any>
  id!:string;

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
      }); 
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
  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}


