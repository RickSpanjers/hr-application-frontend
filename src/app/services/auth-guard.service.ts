// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    let loggedIn = localStorage.getItem("token");
    if (loggedIn == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}