import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-guardies',
  templateUrl: './admin-guardies.component.html',
  styleUrls: ['./admin-guardies.component.css']
})
export class AdminGuardiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
