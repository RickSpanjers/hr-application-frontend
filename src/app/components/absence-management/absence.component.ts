import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { AbsenceService } from 'app/services/absence.service';
import {AbsenceRequestDTO} from 'app/helpers/dto/absencemanagement/AbsenceRequestDTO';
import {CancelRequestDTO} from 'app/helpers/dto/absencemanagement/CancelRequestDTO';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {

  public formContent: any = {};
  public errorMsgs: string[] = [];
  public absenceTypes: string[] = [];
  public absenceList: any = {} = [];
  public resultMsg: string;

  //Misc variables
  public loading = false;

  constructor(private _authService: TokenService, private _router: Router, private _absenceService: AbsenceService) { }

  ngOnInit() {
    this.setAbsenceTypes();
    this.retrieveAbsences();
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
    let dto = new AbsenceRequestDTO(localStorage.getItem("ui"), localStorage.getItem("uci"), this.formContent.absenceType, this.formContent.startDate, this.formContent.endDate, this.formContent.reason);
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

  cancelRequest(requestId: number) {
    this.loading = true;
    let dto = new CancelRequestDTO(localStorage.getItem("ui"), requestId);
      this._absenceService.cancelAbsence(dto)
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
  }

  retrieveAbsences() {
    this.loading = true;
    this._absenceService.retrieveAbsences(localStorage.getItem("ui"))
      .subscribe(
        data => {
          console.log(data);
          this.absenceList = data.data;
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
