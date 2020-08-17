import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { CompanyService } from 'app/services/company.service';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUpdateCompanyDTO } from 'app/helpers/dto/companymanagement/AddUpdateCompanyDTO';
import { AddUpdateFunctionDTO } from 'app/helpers/dto/companymanagement/AddUpdateFunctionDTO';
import { UserService } from 'app/services/user.service';
import { ArchiveOrRemoveUserDTO } from 'app/helpers/dto/usermanagement/ArchiveOrRemoveUserDTO';
import { UpdateRoleDTO } from 'app/helpers/dto/usermanagement/UpdateRoleDTO';
import {DeleteFunctionDTO} from 'app/helpers/dto/companymanagement/DeleteFunctionDTO';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private companyToRetrieve: any;
  private functionList: any = {};
  private employeeList: any = {};
  private add: boolean = true;
  private update: boolean = false;
  private functionToUpdate: any;
  private userList: any = {} = [];
  private roleList: any = {} = [];
  private archivedUserList: any = {} = [];
  private archivedUsers = false;
  private usersInCompany = false;
  private resultMsg: string;

  //Misc variables
  private loading = false;
  
  constructor(private _tokenService: TokenService, private _companyService: CompanyService, private _userService: UserService, private _authService: AuthService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.roleList.push("USER");
    this.roleList.push("MODERATOR");
    this.setCompanyToRetrieve();
    this.retrieveCompany();
    this.retrieveUsersFromCompany();
  }

  setCompanyToRetrieve(){
    this.route.params.subscribe(params => {     
       if(params["company"] != null){
        this.companyToRetrieve = params['company']; 
       }else{
        this.companyToRetrieve = localStorage.getItem("uci");
       }
    });
  }

  retrieveCompany() {
    this.loading = true;
    this._companyService.retrieveCompany(this.companyToRetrieve)
      .subscribe(
        data => {
          this.formContent.organizationName = data.data.name;
          this.formContent.taxId = data.data.taxId;
          this.formContent.registrationNum = data.data.registrationNumber;
          this.formContent.mail = data.data.mail;;
          this.formContent.phone = data.data.phone;
          this.formContent.addressOne = data.data.addressOne;
          this.formContent.addressTwo = data.data.addressTwo;
          this.formContent.zipcode = data.data.zipcode;
          this.formContent.country = data.data.country;
          this.formContent.city = data.data.city
          this.formContent.ceo = data.data.ceo;
          this.resultMsg = data.message;
          this.retrieveCompanyFunctions();
        },
        error => {
          this.errorMsgs.push(error);
          this.loading = false;
        });
  }

  retrieveCompanyFunctions(){
    this.loading = true;
    this._companyService.retrieveCompanyFunctions(this.companyToRetrieve)
      .subscribe(
        data => {
          this.functionList = data.data;
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  setToUpdate(functionId: any){
    this.update = true;
    this.add = false;
    this.loading = true;
    this._companyService.retrieveCompanyFunction(functionId)
      .subscribe(
        data => {
          this.formContent.functionNameUpdate = data.data.name;
          this.formContent.descriptionUpdate = data.data.description;
          this.formContent.functionWageUpdate = data.data.wage;
          this.functionToUpdate = data.data.uuid;
          this.resultMsg = data.message;
          this.loading = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }


  updateCompany(){
    this.loading = true;
    let dto = new AddUpdateCompanyDTO(this.companyToRetrieve, this.formContent.organizationName, this.formContent.taxId, this.formContent.registrationNum, this.formContent.phone, this.formContent.mail, this.formContent.addressOne, this.formContent.addressTwo, this.formContent.city, this.formContent.zipcode, this.formContent.country, false, this.formContent.ceo);
    this._companyService.updateCompany(dto)
      .subscribe(
        data => {
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  addFunction(){
    this.loading = true;
    let dto = new AddUpdateFunctionDTO(null, this.formContent.functionName, this.formContent.description, this.formContent.functionWage, false, this.companyToRetrieve)
    this._companyService.addCompanyFunction(dto)
      .subscribe(
        data => {
          this.functionList = data.data;
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  deleteFunction(functionId: any){
    this.loading = true;
    let request = new DeleteFunctionDTO(functionId, localStorage.getItem("ui"));
    this._companyService.DeleteCompanyFunction(request)
      .subscribe(
        data => {
          this.functionList = data.data;
          this.retrieveCompanyFunctions();
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }
  
  updateFunction(){
    this.loading = true;
    let dto = new AddUpdateFunctionDTO(this.functionToUpdate, this.formContent.functionNameUpdate, this.formContent.descriptionUpdate, this.formContent.functionWageUpdate, false, this.companyToRetrieve)
    console.log(dto);
    this._companyService.updateCompanyFunction(dto)
      .subscribe(
        data => {
          this.functionList = data.data;
          this.retrieveCompanyFunctions();
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  addAccountToCompany(){
    this._router.navigateByUrl("/add-account/"+this.companyToRetrieve);
  }

  retrieveUsersFromCompany() {
    this.loading = true;
    console.log(this.companyToRetrieve);
    this._userService.retrieveUsersFromCompany(this.companyToRetrieve)
      .subscribe(
        data => {
          console.log(data);
          if(data.data.length != 0){
            this.usersInCompany = true;
          }
          this.userList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  retrieveArchivedUsersFromCompany() {
    this.loading = true;
    this._userService.retrieveArchivedUsersFromCompany(this.companyToRetrieve)
      .subscribe(
        data => {
          this.archivedUsers = true;
          this.archivedUserList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          this.loading = false;
        });
  }

  updateUser(userId: any){
   this._router.navigateByUrl("/profile/"+userId)
  }

  archiveOrUnarchiveUser(user: any, archive: string){
    this.loading = true;
    let request = new ArchiveOrRemoveUserDTO(localStorage.getItem("ui"), user, archive);
    this._userService.ArchiveOrRemoveAccount(request)
      .subscribe(
        data => {
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  deleteUser(user: any){
    this.loading = true;
    let request = new ArchiveOrRemoveUserDTO(localStorage.getItem("ui"), user, "DELETE");
    this._userService.ArchiveOrRemoveAccount(request)
      .subscribe(
        data => {
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          this.loading = false;
        });
  }

  updateAccountRole(userId: any, role: string){
    this.loading = true;
    let request = new UpdateRoleDTO(userId, localStorage.getItem("ui"), role);
    console.log(request);
    this._userService.updateAccountRole(request)
      .subscribe(
        data => {
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          this.loading = false;
        });
  }

}
