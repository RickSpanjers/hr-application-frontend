import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { AttendanceService } from 'app/services/attendance.service';
import { AttendanceRequestDTO } from 'app/helpers/dto/attendancemanagement/AttendanceRequestDTO';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.css']
})
export class ArrivalComponent implements OnInit {

  public formContent: any = {};
  public errorMsgs: string[] = [];
  public attendanceList: any = {};
  public count: number = 0;
  public currentTime: any;
  public presence: string = "Check-In";
  public resultMsg: string;

  //Misc variables
  public loading = false;

  constructor(private _authService: TokenService, private _router: Router, private _attendanceService: AttendanceService) {
    setInterval(() => {
      this.currentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    }, 1);
  }

  ngOnInit() {
    this.formContent.fullname = localStorage.getItem("ufn")
    this.retrievePreviousPresence();
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [8.30, 8.21, 9.34, 8.00, 9.00], label: 'Check-in' },
    { data: [16.30, 16.01, 17.40, 16.00, 17.00], label: 'Check-out' }
  ];


  retrievePreviousPresence() {
    this.loading = true;
    this._attendanceService.retrieveAttendance(localStorage.getItem("ui"))
      .subscribe(
        data => {
          console.log(data);
          this.attendanceList = data.data;
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.resultMsg = error.message;
          console.log(error);
          this.loading = false;
        });
  }

  attendanceRequest() {
    this.loading = true;
    let request = new AttendanceRequestDTO(localStorage.getItem("ui"));
    this._attendanceService.requestAttendance(request)
      .subscribe(
        data => {
          console.log(data);
          if (data.data.checkIn != null) {
            this.presence = "Check out";
          }
          this.loading = false;
          this.resultMsg = data.message;
        },
        error => {
          this.resultMsg = error.message;
          console.log(error);
          this.loading = false;
        });
  }

}
