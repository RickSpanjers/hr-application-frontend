import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { AbsenceService } from 'app/services/absence.service';
import {AbsenceRequestDTO} from 'app/helpers/dto/absencemanagement/AbsenceRequestDTO';
import {CancelRequestDTO} from 'app/helpers/dto/absencemanagement/CancelRequestDTO';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-moderator-absence-request',
  templateUrl: './moderator-absence-request.component.html',
  styleUrls: ['./moderator-absence-request.component.css']
})
export class ModeratorAbsenceRequestComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private absenceTypes: string[] = [];
  private absenceList: any = {} = [];
  private userList: any = {} = [];
  private resultMsg: string;
  private selectedUser: any;
  private selectedType: string;

  //Misc variables
  private loading = false;

  constructor(private _authService: TokenService, private _router: Router, private _absenceService: AbsenceService, private _userService: UserService) { }

  ngOnInit() {
    this.setAbsenceTypes();
    this.retrieveUsersFromCompany();
  }

  setAbsenceTypes() {
    this.absenceTypes.push("FMLA");
    this.absenceTypes.push("MILITARY");
    this.absenceTypes.push("VACATION");
    this.absenceTypes.push("SICK");
    this.absenceTypes.push("PARENTAL");
    this.absenceTypes.push("SPECIAL");
    this.absenceTypes.push("UNANNOUNCED");
  }

  requestAbsence() {
    this.loading = true;
    console.log(this.selectedUser);
    let dto = new AbsenceRequestDTO(this.selectedUser, localStorage.getItem("uci"), this.selectedType, this.formContent.startDate, this.formContent.endDate, this.formContent.reason);
    console.log(JSON.stringify(dto));
    if (this.validateRequest(dto)) {
      this._absenceService.requestAbsence(dto)
        .subscribe(
          data => {
            console.log(data);
            this.resultMsg = data.message;
            this.formContent.reason = "";
            this.formContent.startDate = "";
            this.formContent.endDate = "";
            this.loading = false;
          },
          error => {
            this.resultMsg = error.message;
            console.log(error);
            this.loading = false;
          });
    }
  }

  selectUser(userId: any){
    console.log(userId);
    this.selectedUser = userId;
  }
  selectType(type: string){
    console.log(type);
    this.selectedType = type;
  }

  retrieveUsersFromCompany() {
    this.loading = true;
    this._userService.retrieveUsersFromCompany(localStorage.getItem("uci"))
      .subscribe(
        data => {
          console.log(data);
          this.userList = data.data;
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  validateRequest(request: AbsenceRequestDTO): boolean {
    let result = false;
    if (request.reason != null) {
      if (request.absenceType != null) {
        result = true;
      }
    }
    return result;
  }


}
