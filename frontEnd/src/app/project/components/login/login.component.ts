import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  /*public username!: string;
  public password!: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    const body = {username: this.username, password: this.password};
    this.http.post('/api/login', body).subscribe(data => {
      localStorage.setItem('token', data.token);
    }, error => {
      console.log(error);
    });
  }
}
*/
  
  
  username = '';
  password = '';

  constructor(private router: Router, private auth: AuthenticationComponent) {}

  login() {
    if (this.auth.login(this.username, this.password)) {
      console.log('Inici de sessió correcte');
      this.router.navigate(['/navbar']).then(()=>
      this.router.navigate(['/month']));
    } else {
      console.log('Dades incorrectes');
    }
  }
}


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*loginForm: FormGroup;
  usuari= new FormControl('', [Validators.required]);
  contrasenya = new FormControl('', [Validators.required]);

  constructor(private authService: AuthenticationComponent, private router: Router) {
    this.loginForm = new FormGroup({
      usuari: this.usuari,
      contrasenya: this.contrasenya
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.usuari.value, this.contrasenya.value)
        .subscribe(
          (data) => {
            if (data.success) {
              this.router.navigate(['/month']);
            } else {
              alert(data.message);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
*/
