import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/api/Login/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { catchError, take, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulariLogin!: FormGroup;
  errorMissatge!:string;

  constructor(private authService: AuthServiceService, private router: Router, private fb: FormBuilder) { }


  login() {
    let user = {
      nom: this.formulariLogin.get("nom")?.value,
      password: this.formulariLogin.get("password")?.value
    }
    console.log(user);
    this.authService.login(user).pipe(take(1), catchError((err: any) => {
      this.errorMissatge="Dades incorrectes";
      return throwError(() => new Error(this.errorMissatge))
    })).subscribe((result) => {
      console.log(result);
      localStorage.setItem("hospital-accessToken" , result.resultat.accessToken)
      localStorage.setItem("hospital-refreshToken" , result.resultat.accessToken)
      this.router.navigate(['/navbar']).then(()=>
      this.router.navigate(['/month']))
    })
  }

  ngOnInit() {
    this.formulariLogin = this.fb.group({
      nom: [""],
      password: [""]
    })
    
  }
}


























