import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AUtils } from 'src/app/project/services/api/utils/AUtils';
import { AGuardia } from 'src/app/project/services/api/guardia/AGuardia';
import { Guardia } from 'src/app/project/model/entities/implementations/Guardia';
import { lastValueFrom } from 'rxjs';

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
  categoria:string = 'Categoria';
  unitat:string = 'Unitat';
  torn:string = 'Torn';
  
  constructor(private router: Router, private httpUtils:AUtils, public httpG:AGuardia) {
    this.httpUtils.getCategories().subscribe(
      data => {
        this.categories = data['resultat']['dades'];
    });
    this.httpUtils.getTorns().subscribe(
      data => {
        this.torns = (data as any)['resultat']['dades'];
    });
    this.httpUtils.getUnitats().subscribe(
      data => {
        this.unitats = (data as any)['resultat']['dades'];
    });
    this.getPlantilles()
  }

  // Carregar les categories
  getPlantilles(){
    this.httpG.getPlantilles().subscribe(
      data => {
        this.plantilles = data['resultat']['dades'];
    });
  }

  // Inserir nova guardia
  async savePlantilla(unitat:string,torn:string,categoria:string,places:string){
    let plantilla:Guardia = new Guardia(unitat,torn,categoria, parseInt(places));
    await lastValueFrom(this.httpG.savePlantilla(plantilla))

    this.getPlantilles();
  }


  //guardar valors filtrats
  changeUnitat(uni:string): void {this.unitat = uni; }
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
    console.log(this.unitat)
    let list = document.querySelectorAll('.table_li')
    list?.forEach(l => l.classList.add('hide'))
    list?.forEach(l => {
      if(this.filtreTrue(l))l.classList.remove('hide')
    });
  }
  filtreTrue(l:any){
    let categoria = l.querySelector("p[name='cat']").textContent == this.categoria || this.categoria == 'Categoria';
    let torn = l.querySelector("p[name='torn']").textContent == this.torn || this.torn == 'Torn';
    let unitat = l.querySelector("p[name='uni']").textContent == this.unitat || this.unitat == 'Unitat';
    return categoria && torn && unitat
  }


  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
