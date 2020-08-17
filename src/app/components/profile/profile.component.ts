import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { AccountService } from 'app/services/account.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { UpdateProfileDTO } from 'app/helpers/dto/usermanagement/UpdateProfileDTO';
import { UpdatePasswordDTO } from 'app/helpers/dto/usermanagement/UpdatePasswordDTO';
import { AddProfileElementDTO } from 'app/helpers/dto/usermanagement/AddProfileElementDTO';
import { RemoveProfileElementDTO } from 'app/helpers/dto/usermanagement/RemoveProfileElementDTO';
import { ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private educationList: any = {};
  private skillList: any = {};
  private experienceList: any = {};
  private languageList: any = {};
  private profileToRetrieve: any;
  private resultMsg: string;
  private gdprSelect = true;

  //Misc variables
  private loading = false;

  constructor(private _tokenService: TokenService, private _userService: UserService, private _authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    $("#close-sidebar").click(function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
      $(".page-wrapper").addClass("toggled");
    });
    this.setProfileToRetrieve();
  }

  setProfileToRetrieve(){
    this.route.params.subscribe(params => {     
      if(params["profile"] != null){
        this.profileToRetrieve = params["profile"];
      }else{
        this.profileToRetrieve = localStorage.getItem("ui");
      }
   });
   this.retrieveProfile();
  }

  retrieveProfile() {
    this.loading = true;
    this._userService.retrieveProfile(this.profileToRetrieve)
      .subscribe(
        data => {
          console.log(data);
          this.formContent.firstname = data.data.user.firstName;
          this.formContent.lastname = data.data.user.lastName;
          this.formContent.country = data.data.user.country;
          this.formContent.mail = data.data.user.mail;
          this.formContent.company = data.data.user.companyId;
          this.formContent.function = data.data.user.functionId
          this.formContent.telephone = data.data.user.telephone;
          this.formContent.zipcode = data.data.user.zipcode;
          this.experienceList = data.data.experienceList;
          this.languageList = data.data.languageList;
          this.educationList = data.data.educationList;
          this.skillList = data.data.skillList;
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  updateProfile() {
    this.loading = true;
    let dto = new UpdateProfileDTO(this.profileToRetrieve, this.formContent.mail, this.formContent.firstname, this.formContent.lastname, this.formContent.telephone, this.formContent.country, this.formContent.zipcode, this.formContent.place);
    this._userService.updateProfile(dto)
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

  changePassword() {
    this.loading = true;
    if (this.formContent.newPassword === this.formContent.newPasswordConfirm) {
      let dto = new UpdatePasswordDTO(this.profileToRetrieve, this.formContent.oldPassword, this.formContent.newPassword, this.formContent.newPasswordConfirm);
      this._userService.changePassword(dto)
        .subscribe(
          data => {
            this.resultMsg = data.message;
            this.loading = false;
          },
          error => {
            this.errorMsgs.push(error);
            console.log(error);
            this.loading = false;
          });
    } else {
      this.errorMsgs.push("The new passwords are not the same!");
    }

  }

  addProfileElement(type: string) {
    this.loading = true;
    let dto = this.determineProfileDTO(type);
    this._userService.addProfileElement(dto)
      .subscribe(
        data => {
          this.retrieveProfile();
          this.resultMsg = data.message;
          this.loading = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  determineProfileDTO(type: string) {
    let dto;
    switch (type) {
      case "EXPERIENCE":    
      dto = new AddProfileElementDTO(this.profileToRetrieve, this.formContent.wename, this.formContent.wedesc, null, type);
        break;
      case "SKILL":
       dto = new AddProfileElementDTO(this.profileToRetrieve, this.formContent.skillname, this.formContent.skilldesc, null, type);
        break;
      case "LANGUAGE":
        dto  = new AddProfileElementDTO(this.profileToRetrieve, this.formContent.langname, this.formContent.langdesc, null, type);
        break;
      case "EDUCATION":
        dto  = new AddProfileElementDTO(this.profileToRetrieve, this.formContent.eduname, this.formContent.edudesc, this.formContent.educertification, type);
        break;
    }
    return dto;
    
  }

  removeProfileElement(type: string, elementId: number) {
    this.loading = true;
    let dto = new RemoveProfileElementDTO(Number(this.profileToRetrieve), elementId, type);
    this._userService.removeProfileElement(dto)
      .subscribe(
        data => {
          this.retrieveProfile();
          this.resultMsg = data.message;
          this.loading = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }




}
