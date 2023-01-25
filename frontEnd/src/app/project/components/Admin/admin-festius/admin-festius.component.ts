import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ATreballador } from 'src/app/project/services/api/treballador/ATreballador';

@Component({
  selector: 'app-admin-festius',
  templateUrl: './admin-festius.component.html',
  styleUrls: ['./admin-festius.component.css']
})
export class AdminFestiusComponent implements OnInit {
    festius!:Array<any>;
    estats:Array<string> = ['actiu', 'eliminat'];
    mesos:Array<string> = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre'];

  constructor(private router: Router, private http:ATreballador) {
    http.getFestius().subscribe(
      data => {
        this.festius = (data as any)['resultat']['dades'];
        console.log(this.festius)
    });
   } 

  ngOnInit(): void {
  }
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
  dataToString(data:Date){
    return new DatePipe("en-US").transform(data, "MM/dd");
  }
}
