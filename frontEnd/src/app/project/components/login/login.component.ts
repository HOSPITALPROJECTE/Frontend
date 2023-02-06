import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/api/Login/auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { catchError, take, throwError } from 'rxjs';
import { ATreballador } from '../../services/api/treballador/ATreballador';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulariLogin!: FormGroup;
  errorMissatge!:string;

  constructor(private authService: ATreballador, private router: Router, private fb: FormBuilder) { }

  

  ngOnInit() {
    localStorage.clear();
    this.formulariLogin = this.fb.group({
      nom: [""],
      password: [""]
    })
  }


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
      console.log(localStorage.getItem("hospital-accessToken") + "holas")
      setTimeout(()=>{
        this.router.navigate(['/navbar']).then(()=>
        this.router.navigate(['/month']));
      }, 500)
    })
  }

    
}



























