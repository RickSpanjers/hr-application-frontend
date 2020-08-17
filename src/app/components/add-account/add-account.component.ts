import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { TokenService } from 'app/services/token.service';
import { AddAccountDTO } from 'app/helpers/dto/usermanagement/AddAccountDTO';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  public formContent: any = {};
  public errorMsgs: string[] = [];
  public resultMsg: string;
  public companyList: any = {} = [];
  public companyFunctions: any = {} = [];

  //Misc variables
  public loading = false;

  constructor(private _tokenService: TokenService, private _userService: UserService, private _companyService: CompanyService, private _authService: AuthService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.determineCompanyToRetrieve();
  }

  addAccount() {
    this.loading = true;
    let dto = new AddAccountDTO(null, this.formContent.mail, this.formContent.firstname, this.formContent.lastname, this.formContent.telephone, 
      this.formContent.address, this.formContent.place, this.formContent.country, this.formContent.zipcode, 
      this.formContent.password, this.formContent.passwordConfirm, "USER", this.formContent.selectedFunction, 
      this.formContent.selectedCompany, localStorage.getItem("ui"));
    console.log(JSON.stringify(dto));
    this._userService.addAccount(dto)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  determineCompanyToRetrieve(){
    this.route.params.subscribe(params => {     
      if(params["company"] != null){
       this.retrieveCompany(params["company"]);
      }else{
       this.retrieveCompanies();
      }
   });
  }

  retrieveCompanies(){
    this.loading = true;
    this._companyService.retrieveCompanies(localStorage.getItem("ui"))
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.companyList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  retrieveCompany(companyId: any){
    this.loading = true;
    this._companyService.retrieveCompany(companyId)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.companyList = [];
          this.companyList.push(data.data);
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  retrieveCompanyFunctions(){
    this.loading = true;
    this._companyService.retrieveCompanyFunctions(this.formContent.selectedCompany)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.companyFunctions = [];
          this.companyFunctions = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

}
