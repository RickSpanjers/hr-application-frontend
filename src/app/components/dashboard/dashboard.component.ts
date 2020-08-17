import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserService } from 'app/services/user.service';
import { CompanyService } from 'app/services/company.service';
import { AbsenceService } from 'app/services/absence.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public errorMsgs: string[] = [];
  private isAdministrator: boolean = false;
  private isModerator: boolean = false;
  private isUser: boolean = false;
  public resultMsg: string;

  //Dashboard data
  private checkIn: string
  private checkOut: string;
  private absenceTotal: number;
  private employeeTotal: number;
  private openAbsenceRequestTotal: number;
  private companyFunction: string;
  private companyName: string;

  //Misc variables
  public loadingCompany = false;
  public loadingAbsence = false;
  public loadingEmployees = false;
  public loadingOpenRequests = false;

  constructor(private _router: Router, private _userService: UserService, private _companyService: CompanyService, private _absenceService: AbsenceService) { }

  ngOnInit() {
    this.validatePermissions();
  }

  validatePermissions() {
    
  }

  retrieveDashboardData_Employees(){
    this.loadingEmployees = true;
    this.loadingAbsence = true;
    this._userService.retrieveDashboardData(localStorage.getItem("uci"))
      .subscribe(
        data => {
          this.employeeTotal = data.data;
          this.resultMsg = data.message;
          this.retrieveDashboardData_Absences();
          this.loadingEmployees = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loadingEmployees = false;
        });
  }

  retrieveDashboardData_Absences(){
    this._absenceService.retrieveDashboardAbsenceData(localStorage.getItem("uci"))
      .subscribe(
        data => {
          this.absenceTotal = data.data; 
          this.resultMsg = data.message;
          this.pieChartData = [this.absenceTotal, this.employeeTotal-this.absenceTotal];
          this.loadingEmployees = false;
          this.loadingAbsence = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loadingAbsence = false;
        });
  }

    retrieveDashboardData_OpenRequests(){
    this.loadingOpenRequests = true;
    this._absenceService.retrieveDashboardOpenRequestData(localStorage.getItem("uci"))
      .subscribe(
        data => {
          this.resultMsg = data.message;
          this.openAbsenceRequestTotal = data.data;
          this.loadingOpenRequests = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loadingOpenRequests = false;
        });
  }

  retrieveDashboardData_Company(){
    this.loadingCompany = true;
    this._companyService.retrieveDashboardData(localStorage.getItem("uci"), localStorage.getItem("ufi"))
      .subscribe(
        data => {
          this.companyName = data.data.company;
          this.companyFunction = data.data.function;
          this.resultMsg = data.message;
          this.loadingCompany = false;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loadingCompany = false;
        });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Absences'], ['Present']];
  public pieChartData: number[] = [200, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
}
