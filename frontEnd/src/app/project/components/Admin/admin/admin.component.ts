import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

 
  
    isMenuOpened: boolean = false;
    isMenuOpened2: boolean = false;
    isMenuOpened3: boolean = false;
  
    toggleMenu(): void {
      this.isMenuOpened = !this.isMenuOpened;
    }

    toggleMenu2(): void {
      this.isMenuOpened2 = !this.isMenuOpened2;
    }

    toggleMenu3(): void {
      this.isMenuOpened3 = !this.isMenuOpened3;
    }
    
    constructor(private router: Router) { }
    
    goToAdminGuardies(){
      this.router.navigate(['/admin-guardies']);
    }
    goToAdminTreballadors(){
      this.router.navigate(['/admin-treballadors']);
    }
    goToAdminFestius(){
      this.router.navigate(['/admin-festius']);
    }

    goToAdminPlantillaGuardies(){
      this.router.navigate(['/admin-plantillaguardies']);
    }
    
  

}


