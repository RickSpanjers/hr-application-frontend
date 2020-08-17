import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {

  token: string;

  getToken() {
    return this.token;
  }
  
  setTokenWithoutCharacter(token: string) {
    this.token = token;
  }

  setToken(token: string) {
    this.token = token += '=';
  }

}
