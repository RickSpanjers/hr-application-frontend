import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { AddUpdateCompanyDTO } from 'app/helpers/dto/companymanagement/AddUpdateCompanyDTO';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public formContent: any = {};
  public errorMsgs: string[] = [];
  public resultMsg: string;
  //Misc variables
  public loading = false;

  constructor(private _tokenService: TokenService, private _companyService: CompanyService, private _authService: AuthService, private _router: Router){

  }

  ngOnInit() {
  }

  addCompany() {
    this.loading = true;
    let dto = new AddUpdateCompanyDTO(0, this.formContent.organizationName, this.formContent.taxId, this.formContent.registrationNum, this.formContent.phone, this.formContent.mail, this.formContent.addressOne, this.formContent.addressTwo, this.formContent.city, this.formContent.zipcode, this.formContent.country, false, this.formContent.ceo);
    console.log(JSON.stringify(dto));
    this._companyService.addCompany(dto)
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          this.resultMsg = data.message;
          this._router.navigateByUrl("companies");
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

}
