import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-treballadors',
  templateUrl: './admin-treballadors.component.html',
  styleUrls: ['./admin-treballadors.component.css']
})
export class AdminTreballadorsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
