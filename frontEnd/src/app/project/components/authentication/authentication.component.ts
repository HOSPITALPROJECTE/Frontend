import { Component} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent{
  
  private users = [{username: 'hola', password: 'hola'},{username:'josep', password:'josep'}];

  login(username: string, password: string): boolean{
    const user = this.users.find(u => u.username === username);
    if (user && user.password === password) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }
  /* verifica si l'usuari i la contrasenya posats són vàlids comparant amb els usuaris i contrasenyes de l'array users,
   si és vàlid guarda un token d'autenticació en el localStorage.*/
   
  logout() {
    localStorage.removeItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  isLoggedIn() {
    return !!this.getUser();
  }
  }
