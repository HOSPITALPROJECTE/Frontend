import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unitat } from '../../model/entities/implementations/Unitat';
import { ATreballador } from '../../services/api/treballador/ATreballador';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit,AfterViewInit {
  unitats!:Array<any>;
  totalUnitats!:number;
  guardies!:Array<any>;
  guardiesUnitat:Array<Unitat> = []
  dni:string = '111111111E'


  constructor(private router: Router, private httpClient:ATreballador) { 
    this.httpClient.getUnitats().subscribe(
      data => {
        console.log(data);
        this.unitats = (data as any)['resultat']['dades'];
        this.totalUnitats = this.unitats.length;
      });
      this.httpClient.getHistorialTreballador(this.dni).subscribe(
        data => {
          console.log(data)
          this.guardies = data['resultat']['dades'];
          this.guardies.forEach(guardia => {
            let existeix = true;
            let contador = 0
            while(existeix && contador < this.guardiesUnitat.length) {
              console.log('----')
              console.log(this.guardiesUnitat[contador].nom)
              console.log(guardia.unitat)
              if(this.guardiesUnitat[contador].nom == guardia.unitat) existeix = false;
              contador ++;
            }
            if(!existeix)this.guardiesUnitat[contador-1].sumNum()
            else this.guardiesUnitat.push(new Unitat(guardia.unitat))
          });
          console.log(this.guardiesUnitat)
      });
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.goToAgenda();
  }
  goToAgenda() {
    let inicialX = 0;
    let finalX = 0;
    
    document.getElementById('body')?.addEventListener('touchmove', (event) => {
      finalX = event.touches[0].clientX;
      if(inicialX - 75 > finalX) this.router.navigate(['/agenda']);;
    });
    
    document.getElementById('body')?.addEventListener('touchstart', (event) => {
      inicialX = event.touches[0].clientX;
    });
  }
}
