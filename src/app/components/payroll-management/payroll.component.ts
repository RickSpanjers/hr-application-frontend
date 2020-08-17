import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private resultMsg: string;

  constructor() { }

  ngOnInit() {
  }

  retrievePayrollList(){

  }

  filterPayroll(){
    
  }

  downloadPayroll(){
    
  }

}
