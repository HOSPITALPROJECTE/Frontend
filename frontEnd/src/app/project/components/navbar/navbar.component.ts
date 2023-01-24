import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin!:boolean;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    const token = localStorage.getItem("hospital-accessToken");
    console.log(token);
    if(token!=null){
    const decodedToken:any = jwt_decode(token);
    console.log(decodedToken);
    this.isAdmin = decodedToken.rol === 'ADMIN';
    console.log(this.isAdmin)
    }
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
