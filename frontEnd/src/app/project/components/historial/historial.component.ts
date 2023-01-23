import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit,AfterViewInit {

  constructor(private router: Router) { }

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
