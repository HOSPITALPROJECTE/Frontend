import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToCalendari(){
    this.router.navigate(['/month']);
  }
  goToAgenda(){
    this.router.navigate(['/agenda']);
  }
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
}
