import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unitat } from '../../model/entities/implementations/Unitat';
import { AUtils } from '../../services/api/AUtils/AUtils';
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
  conicGradient!:string;

  constructor(private router: Router, private httpClient:ATreballador, private httpUtils:AUtils) { 
    this.httpUtils.getUnitats().subscribe(
      data => {
        this.unitats = (data as any)['resultat']['dades'];
      });
      this.httpClient.getHistorialTreballador(this.dni).subscribe(
        data => {
          this.guardies = data['resultat']['dades'];
          this.totalUnitats = this.guardies.length
          this.guardies.forEach(guardia => {
            let existeix = true;
            let contador = 0
            while(existeix && contador < this.guardiesUnitat.length) {
              if(this.guardiesUnitat[contador].nom == guardia.unitat) existeix = false;
              contador ++;
            }
            if(!existeix)this.guardiesUnitat[contador-1].sumNum()
            else this.guardiesUnitat.push(new Unitat(guardia.unitat))
          });
          this.setCronicGradient()
      });
  }
  setCronicGradient(){
    let lastPercent = 0;
    this.conicGradient = 'conic-gradient(';
    this.guardiesUnitat.forEach(unitat => {
      let color = '--'+unitat.nom.replace(' ', '-').toLocaleLowerCase();
      let percent = (unitat.num * 100 / this.totalUnitats).toString()
      this.conicGradient = this.conicGradient+'var('+color+') '+lastPercent+'% '+(parseInt(percent) + lastPercent)+'%,'
      lastPercent = (parseInt(percent) + lastPercent);
    })
    this.conicGradient = this.conicGradient.slice(0, -1)+')'

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

  setColorUnitat(unitat:string){
    return unitat.slice(-1);
  }
}
