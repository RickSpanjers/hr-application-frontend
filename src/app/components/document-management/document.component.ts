import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private resultMsg: string;
  
  constructor() { }

  ngOnInit() {
  }

}
