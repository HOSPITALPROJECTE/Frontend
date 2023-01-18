import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-festius',
  templateUrl: './admin-festius.component.html',
  styleUrls: ['./admin-festius.component.css']
})
export class AdminFestiusComponent implements OnInit {
    

  constructor(private router: Router) { }
  

  ngOnInit(): void {
  }
 
  goToAdmin(){
    this.router.navigate(['/admin']);
  }
}
