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
  guardies!:Array<any>
  dni!:string;
  nom!:string;

  constructor(private router: Router, private httpClient:ATreballador, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.dni = params['dni'];
    });
    this.httpClient.getGuardiesTreballador(this.dni).subscribe(
    data => {
      console.log(data)
      this.guardies = data['resultat']['dades'];
      this.nom = this.guardies[0].nom;
      console.log(this.guardies);
    });
  }

  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "yyyy-MM-dd");
  }
  ngOnInit(): void {
  }

}
