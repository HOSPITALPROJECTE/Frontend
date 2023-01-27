import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUtils } from 'src/app/project/services/api/AUtils/AUtils';
import { AGuardia } from 'src/app/project/services/api/guardia/AGuardia';

@Component({
  selector: 'app-admin-plantillaguardies',
  templateUrl: './admin-plantillaguardies.component.html',
  styleUrls: ['./admin-plantillaguardies.component.css']
})
export class AdminPlantillaguardiesComponent {
  plantilles!:Array<any>;
  categories!:Array<any>;
  torns!:Array<any>;
  unitats!:Array<any>;
  categoria:string = 'Totes';
  unitat:string = 'Totes';
  torn:string = 'Totes';
  constructor(private router: Router, private httpUtils:AUtils, private httpG:AGuardia) {
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
    httpG.getPlantilles().subscribe(
      data => {
        this.plantilles = data['resultat']['dades'];
    })
  }
  //guardar valors filtrats
  changeUnitat(uni:string): void {this.unitat = uni; console.log(uni)}
  changeCategoria(cat:string): void {this.categoria = cat}
  changeTorn(torn:string): void {this.torn = torn}

  // (click) => una fila d'una taula:
  selectElement(li:HTMLElement){
    this.removeActiveLi();
    li.classList.add('active');
  }
  removeActiveLi(){
    document.querySelectorAll('.table_li')?.forEach(l => l.classList.remove('active'));
  }

  //filtres
  filtrar(){
    let list = document.querySelectorAll('.table_li')
    list?.forEach(l => l.classList.add('hide'))
    list?.forEach(l => {
      if(this.filtreTrue(l))l.classList.remove('hide')
    });
  }
  filtreTrue(l:any){
    let categoria = l.querySelector("p[name='cat']").textContent == this.categoria || l.querySelector("p[name='cat']").textContent == 'Totes';
    let torn = l.querySelector("p[name='torn']").textContent == this.torn || l.querySelector("p[name='torn']").textContent == 'Totes';
    let unitat = l.querySelector("p[name='uni']").textContent == this.unitat || l.querySelector("p[name='uni']").textContent == 'Totes';
    return categoria && torn && unitat
  }


  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
