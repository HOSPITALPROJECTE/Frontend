import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUtils } from 'src/app/project/services/api/AUtils/AUtils';
import { AGuardia } from 'src/app/project/services/api/guardia/AGuardia';


@Component({
  selector: 'app-admin-guardies',
  templateUrl: './admin-guardies.component.html',
  styleUrls: ['./admin-guardies.component.css']
})
export class AdminGuardiesComponent implements OnInit, AfterViewInit {
  guardies!:Array<any>;
  filter_data: string = '';
  filter_dni: string = '';
  filter_select!: string;
  categories!:Array<any>;
  torns!:Array<any>;
  unitats!:Array<any>;
  categoria:string = 'Totes';
  unitat:string = 'Totes';
  torn:string = 'Totes';
  constructor(private router: Router, private httpClient:AGuardia, private httpUtils:AUtils) {

    this.httpUtils.getCategories().subscribe(
      data => {
        this.categories = data['resultat']['dades'];
    }) 
    this.httpUtils.getTorns().subscribe(
      data => {
        this.torns = (data as any)['resultat']['dades'];
    }) 
    this.httpUtils.getUnitats().subscribe(
      data => {
        this.unitats = (data as any)['resultat']['dades'];
    })
    httpClient.getGuardies().subscribe(
      data => {
        this.guardies = data['resultat']['dades'];
    })
    
 
    }
    selectElement(p:HTMLElement){
      this.removeActiveP();
      p.classList.add('active');
    }
    removeActiveP(){
      document.querySelectorAll('.llista')?.forEach(l => l.classList.remove('active'));
    }
    changeUnitat(unitat:string): void {this.unitat = unitat; console.log(unitat)}
  changeCategoria(cat:string): void {this.categoria = cat}
  changeTorn(torn:string): void {this.torn = torn}

  

  ngOnInit(): void {
  }


  /******************
     VISUAL ACTIONS 
  *******************/

  ngAfterViewInit(): void {
    this.setFilterSelect()
    this.selectData(); // acció al seleccionar un treballador
  }
  setFilterSelect(){
    let select = document.querySelector('select')?.value;
    if (select!=null) this.filter_select = select;
    else this.filter_select = '';
  }

  
  filtrar(){
    let list = document.querySelectorAll('.info')
    list?.forEach(l => l.classList.add('hide'))
    list?.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide')
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
  
  filterTrue(element:any){
    let categoria = element.querySelector("span[name='cat']").textContent == this.categoria || element.querySelector("span[name='cat']").textContent == 'Totes';
    let torn = element.querySelector("span[name='torn']").textContent == this.torn || element.querySelector("span[name='torn']").textContent == 'Totes';
    let unitat = element.querySelector("span[name='unitat']").textContent == this.unitat || element.querySelector("span[name='unitat']").textContent == 'Totes';
    return categoria && torn && unitat
  }
  

  goToAdmin(){
    this.router.navigate(['/admin']);
  }
  
/*

setSelectFilter(value:string): void {
		this.filter_select = value;
	}
  btnsActions(){
    this.btnSecondary();
    this.btnPrimary();
  }
  btnSecondary(){
    document.querySelector('.btn_secondary')?.addEventListener('click', () => {
      document.querySelector('.btns')?.classList.remove('active');
      this.removeSelecions(document.querySelectorAll('.info'));
    });
  }
  btnPrimary(){
    document.querySelector('.btn_primary')?.addEventListener('click', () => {
      let cat = document.querySelector(".info.active > p[name='cat']")?.textContent;
      if(cat != null)
        this.goToAdmin();
    })
  }*/

}
