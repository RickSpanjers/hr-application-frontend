import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem("ui");
    localStorage.removeItem("uci");
    localStorage.removeItem("ufi");
    localStorage.removeItem("ufn");
    localStorage.removeItem("ur");
    localStorage.removeItem("token");
    localStorage.clear();
    this._router.navigateByUrl("login");
  }

}
