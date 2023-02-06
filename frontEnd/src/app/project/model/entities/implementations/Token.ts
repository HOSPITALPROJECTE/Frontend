import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
import { ATreballador } from "src/app/project/services/api/treballador/ATreballador";

export class Token{
    constructor(private router:Router, private http:HttpClient) {
        let timeLeftToRefresh = 5;
        let token:any = localStorage.getItem("hospital-accessToken");
        if(token){
            token = jwt_decode(token);
            if(this.checkToken(token)) {
                console.log(timeLeftToRefresh)
                if(this.timeToExpire(token) < timeLeftToRefresh) this.checkRefresh();
            }
            else this.goToLogin();
        }else this.goToLogin();
    }

    /* Check if the token is valid
     * token valid == true
     * token expired == false
     */
    checkToken(token:any){
        let valid = true;
        if (this.timeToExpire(token) < 0) valid = false;
        return valid
    }

    timeToExpire(token:any){
        console.log((token.exp - Date.now() / 1000) / 60)
        return (token.exp - Date.now() / 1000) / 60
    }

    checkRefresh(){
        console.log('refresh')
        let token = localStorage.getItem("hospital-refreshToken");
        if (token) {
            console.log('hola')
            let tokenDecoded = jwt_decode(token);
            // if refresh token is valid, then refresh access token
            console.log('aaaaaaaaa')
            console.log(this.checkToken(tokenDecoded))
            if (this.checkToken(tokenDecoded)) this.refreshToken();
            else this.goToLogin();
        }
    }

    refreshToken(){
        console.log("Refreshing");
        // Enviar el token de actualización al servidor y recibir un nuevo token de acceso
        const refreshToken = localStorage.getItem('hospital-refreshToken');
        this.http.post('http://localhost:4000/api/data-access/refreshToken', { refreshToken })
          .subscribe(response => {
            console.log(response);
            /*let accessToken = response.accessToken;
            let refreshToken = response.refreshToken;
            localStorage.setItem('hospital-accessToken', accessToken);
            localStorage.setItem('hospital-refreshToken', refreshToken);*/
          });

    }

    private goToLogin(){this.router.navigate(['/login']);}
}