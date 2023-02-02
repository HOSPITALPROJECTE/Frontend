import { DatePipe } from '@angular/common';
import { STRING_TYPE } from '@angular/compiler';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-guardies',
  templateUrl: './admin-guardies.component.html',
  styleUrls: ['./admin-guardies.component.css']
})
export class AdminGuardiesComponent implements AfterViewInit{

  data:any;
  unitats:Array<string> =['Unitat 1','Unitat 2','Unitat 3', 'Unitat 4']
  unitat:string='Totes';
  categories:Array<string> =['Infermeria','TCAI']
  categoria:string='Totes';
  torns!:Array<any>;
  places!:Array<any>;

  guardies!:Array<any>;

  constructor(private router: Router, private httpClient:ATreballador, private route: ActivatedRoute) {
    this.httpClient.getGuardies().subscribe(
      data=> {
      this.guardies = data['resultat']['dades'];
    })
  }

  ngAfterViewInit(): void {
    this.btnsActions(); 
  }

  selectGuardia(li:Element){
    let ul = li.parentNode?.querySelectorAll('.table_li');
    if(ul != null) this.removeSelecions(ul);
    li.classList.add('active');

    this.actionsWithGuardia();
  }
  removeSelecions(guardies:NodeListOf<Element>){
    guardies.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
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

  btnsActions(){
    this.btnSecondary();
    this.btnPrimary();
  }
  btnPrimary(){
    document.querySelector('.btn_primary')?.addEventListener('click', () => {
      let unitat = document.querySelector(".table_li.active > p[class='unitat']")?.textContent;
      if(unitat != null)
        this.goToTreballadorsGuardia()
    })
  }
  btnSecondary(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.table_li'));
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
    let data = element.querySelector("p[class='dia']")?.textContent == this.data;
    let unitat = element.querySelector("p[class='unitat']")?.textContent == this.unitat|| this.unitat == 'Totes'
    let categoria = element.querySelector("p[class='categoria']")?.textContent == this.categoria|| this.categoria == 'Totes'
    return data && unitat && categoria;
  }

  setSelectFilterDate(data:string): void {
    let date=this.dataToString(data);
    this.data=date;
    console.log(this.data);
	}
  setSelectFilterCategoria(categoria:string): void {
		this.categoria = categoria;
	}
  setSelectFilterUnitat(unitat:string): void {
		this.unitat = unitat;
	}
  dataToString(data:string){
    return new DatePipe("en-US").transform(data, "dd-MM-yyyy");
  }
  
  goToTreballadorsGuardia(){
    this.router.navigate(['/admin-treballadors-x-guardia']);
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }
}
