import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-plantillaguardies',
  templateUrl: './admin-plantillaguardies.component.html',
  styleUrls: ['./admin-plantillaguardies.component.css']
})
export class AdminPlantillaguardiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

}
