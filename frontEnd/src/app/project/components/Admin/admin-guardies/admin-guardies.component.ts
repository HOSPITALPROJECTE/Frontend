import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AGuardia } from 'src/app/project/services/api/guardia/guardia';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-guardies',
  templateUrl: './admin-guardies.component.html',
  styleUrls: ['./admin-guardies.component.css']
})
export class AdminGuardiesComponent implements OnInit, AfterViewInit {

  filter_data: string = '';
  filter_dni: string = '';
  filter_select!: string;
  constructor(private router: Router, private httpClient:ATreballador) {
    console.log('inici');
    this.httpClient.getTreballador().subscribe(
    data => {
      console.log("Dins subscribe");
      console.log(data);
    }
    ); 
  }

  ngOnInit(): void {
  }


  /******************
     VISUAL ACTIONS 
  *******************/

  ngAfterViewInit(): void {
    this.setFilterSelect()
    this.selectData(); // acció al seleccionar un treballador
    this.filterTable(); // filtratje de la taula
  }
  setFilterSelect(){
    let select = document.querySelector('select')?.value;
    if (select!=null) this.filter_select = select;
    else this.filter_select = '';
  }

  
  filterTable(){
    let list = document.querySelectorAll('.info');
    document.querySelector('.filtre > #buscar')?.addEventListener('click', () => {
      this.filterElements(list);
     
    });
  }
  selectData(){
    let guardies =  document.querySelectorAll('.info');
    guardies?.forEach(li => li.addEventListener('click', () => {
      this.removeSelecions(guardies);
      li.classList.add('active');

      this.actionsWithGuardia();
    }))
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
  filterElements(list:NodeListOf<Element>){
    list.forEach(l => {
      if(this.filterTrue(l)){l.classList.remove('hide'); }
      else l.classList.add('hide');
  
    });
  }
  filterTrue(element:Element){
    let select = element.querySelector("span[name='cat']")?.textContent == this.filter_select;
    let data = element.querySelector("span[name='data']")?.textContent?.includes(this.filter_data);
    
    return select && data;
  }
  setSelectFilter(value:string): void {
		this.filter_select = value;
	}

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
