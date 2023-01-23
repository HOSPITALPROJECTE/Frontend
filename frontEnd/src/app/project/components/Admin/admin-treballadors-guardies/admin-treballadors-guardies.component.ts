import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-treballadors-guardies',
  templateUrl: './admin-treballadors-guardies.component.html',
  styleUrls: ['./admin-treballadors-guardies.component.css']
})
export class AdminTreballadorsGuardiesComponent implements OnInit {
  apunt:boolean = false

  gEstats:Array<string> =['Apuntat','Assignat']
  gEstat!:string;
  estats:Array<string> =['actiu','eliminat']
  estat!:string;

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

  ngOnInit(): void {
  }
  setGEstatFilter(estat:string){
    this.gEstat = estat;
  }
  setEstatFilter(estat:string){
    this.estat = estat;
  }
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "yyyy-MM-dd");
  }
  /* Navegació */
  goToTreballadors(){
    this.router.navigate(['/admin-treballadors']);
  }

}
