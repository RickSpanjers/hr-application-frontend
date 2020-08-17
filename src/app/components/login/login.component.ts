import { Component, OnInit, ɵConsole } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { AccountService } from 'app/services/account.service';
import { LoginDTO } from 'app/helpers/dto/usermanagement/LoginDTO';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];

  //Misc variables
  private loading = false;

  constructor(private _tokenService: TokenService, private _accountService: AccountService, private _authService: AuthService, private _router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

    // LOGIN
    login() {
      this.loading = true;
      let dto = new LoginDTO(this.formContent.mail, this.formContent.password);
      this._accountService.login(dto)
        .subscribe(
          data => {
            console.log(data);
            this._authService.login(data);
            this.loading = false;
            this._router.navigateByUrl("dashboard");
          },
          error => {
            this.errorMsgs.push(error);
            console.log(error);
            this.loading = false;
            this._router.navigateByUrl("dashboard");
          });
    }

    setAccountPermissions(data: any){
      //set permissions based on account
    }

}
