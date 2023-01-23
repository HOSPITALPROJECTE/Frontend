import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guardies';

  showLogin=false;
  showCalendari=false;

  constructor(private router: Router){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/login') {
          this.showLogin = true;
          this.showCalendari = false;
        } else if (event.url === '/navbar') {
          this.showLogin = false;
          this.showCalendari=true;
        }
      
        }
      })
    }
}
