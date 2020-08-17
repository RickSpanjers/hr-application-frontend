import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(data){
    console.log(data);
    localStorage.setItem("ui", data.data.id);
    localStorage.setItem("uci", data.data.companyId);
    localStorage.setItem("ufi", data.data.functionId);
    localStorage.setItem("ufn", data.data.firstname + " " + data.data.lastname);
    localStorage.setItem("ur", data.data.role);
    localStorage.setItem("token", data.data.token);
  }
}
