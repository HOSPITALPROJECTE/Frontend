import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-treballadors-guardies',
  templateUrl: './admin-treballadors-guardies.component.html',
  styleUrls: ['./admin-treballadors-guardies.component.css']
})
export class AdminTreballadorsGuardiesComponent{
  apunt:boolean = false

  gEstats:Array<string> =['apuntat','assignat']
  gEstat:string='apuntat';
  estats:Array<string> =['actiu','eliminat']
  estat:string='actiu';

  guardies!:Array<any>;
  dni!:string;
  nom!:string;

  constructor(private router: Router, private httpClient:ATreballador, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.dni = params['dni'];
      this.httpClient.getTreballador(this.dni).subscribe(
      data => this.nom = data['resultat']['dades'][0].nom);
    });
    this.httpClient.getGuardiesTreballador(this.dni).subscribe(
    data => {
      this.guardies = data['resultat']['dades'];
      this.apunt = true;
    });
  }
  selectTreballador(li:Element){
    let ul = li.parentNode?.querySelectorAll('.table_li');
    if(ul != null) this.removeSelecions(ul);
    li.classList.add('active');
  }
  removeSelecions(treballadors:NodeListOf<Element>){
    treballadors.forEach(t => {
      t.classList.remove('active');
      document.querySelector('#exit')?.classList.remove('hide');
    });
  }
  setFilterGEstat(){
    let select = document.querySelector('select')?.value[0];
    if (select!=null && select!='') this.gEstat = select;
    else this.gEstat = 'apuntat'
  }
  filterElements(){
    let list = document.querySelectorAll('.table_li');
    list.forEach(l => {
      if(this.filterTrue(l))l.classList.remove('hide');
      else l.classList.add('hide');
    });
  }
  filterTrue(element:Element){
    let gEstat = element.querySelector("p[name='guard']")?.textContent == this.gEstat;
    return gEstat;
  }
  setGEstatFilter(gEstat:string){
    this.gEstat = gEstat;
  }
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "yyyy-MM-dd");
  }
  goToTreballadors(){
    this.router.navigate(['/admin-treballadors']);
  }
}
