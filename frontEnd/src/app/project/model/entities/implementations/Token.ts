import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

export class Token{
    constructor(private router:Router) {
        let timeLeftToRefresh = 5;
        let token:any = localStorage.getItem("hospital-accessToken");
        if(token){
            token = jwt_decode(token);
            if(this.checkToken(token)) {
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

    timeToExpire(token:any){return (token.exp - Date.now() / 1000) / 60}

    checkRefresh(){
        let token = localStorage.getItem("hospital-refreshToken");
        if (token) {
            let tokenDecoded = jwt_decode(token);
            // if refresh token is valid, then refresh access token
            if (this.checkToken(tokenDecoded)) this.refreshToken;
            else this.goToLogin();
        }
    }

    refreshToken(){

    }

    private goToLogin(){this.router.navigate(['/login']);}
}