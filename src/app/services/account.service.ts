import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Util } from '../helpers/util';
import { catchError } from 'rxjs/operators';
import { LoginDTO } from 'app/helpers/dto/usermanagement/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loginUrl = CONFIG.baseUrls.loginRequestUrl;

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return throwError(Util.createErrorMessage(error));
  }

   //login
   public login(loginRequest: LoginDTO) {
    return (this.http.post<any>(this.loginUrl, loginRequest,
    )).pipe(catchError(this.handleError));
  }
}
