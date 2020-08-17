import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { AbsenceService } from 'app/services/absence.service';
import { UserService } from 'app/services/user.service';
import { UpdateAbsenceStatusDTO } from 'app/helpers/dto/absencemanagement/UpdateAbsenceStatusDTO';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private userList: number[] = [];
  private absenceList: any = {} = [];
  private resultMsg: string;
  private noOpenRequests: string;

  //Misc variables
  private loading = false;

  constructor(private _authService: TokenService, private _router: Router, private _absenceService: AbsenceService, private _userService: UserService) { }

  ngOnInit() {
    this.retrieveAllRequests();
  }

  retrieveAllRequests() {
    this._absenceService.retrieveOpenAbsenceList(localStorage.getItem("uci"))
      .subscribe(
        data => {
          console.log(data);
          this.resultMsg = data.message;
          this.absenceList = data.data;
          this.showRequestMessage();
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  showRequestMessage(){
    if(this.absenceList.length == 0){
      this.noOpenRequests = "There are currently no open requests to review";
    }else{
      this.noOpenRequests = null;
    }
  }

  updateAbsenceStatus(absenceId: number, absenceStatus: string){
    let dto = new UpdateAbsenceStatusDTO(absenceId, absenceStatus);
    console.log(JSON.stringify(dto));
    this._absenceService.updateAbsenceStatus(dto)
      .subscribe(
        data => {
          console.log(data);
          this.resultMsg = data.message;
          this.resultMsg = data.message;
        },
        error => {
          this.resultMsg = error.message;
          console.log(error);
          this.loading = false;
        });
  }

}
