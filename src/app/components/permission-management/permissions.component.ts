import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private resultMsg: string;
  
  constructor() { }

  ngOnInit() {
  }

}
