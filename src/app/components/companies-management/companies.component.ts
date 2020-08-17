import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  
  public formContent: any = {};
  public errorMsgs: string[] = [];
  public companyList: any = {} = [];
  public archivedCompanyList: any = {} = [];
  public archivedCompanies = false;
  public resultMsg: string;

    //Misc variables
    public loading = false;

  constructor(private _tokenService: TokenService, private _router: Router, private _companyService: CompanyService, private _authService: AuthService) { }

  ngOnInit() {
    this.retrieveCompanies();
  }

  retrieveCompanies() {
    this.loading = true;
    this._companyService.retrieveCompanies(localStorage.getItem("ui"))
      .subscribe(
        data => {
          console.log(data);
          this.companyList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  retrieveArchivedCompanies() {
    this.loading = true;
    this._companyService.retrieveArchivedCompanies(localStorage.getItem("ui"))
      .subscribe(
        data => {
          console.log(data);
          this.archivedCompanies = true;
          this.archivedCompanyList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  updateCompany(companyId: any){
   this._router.navigateByUrl("/company/"+companyId)
  }

  archiveOrUnarchiveCompany(companyId: any){
    this.loading = true;
    this._companyService.archiveCompany(companyId)
      .subscribe(
        data => {
          console.log(data);
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }



}