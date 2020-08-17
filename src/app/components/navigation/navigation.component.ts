import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAdministrator: boolean = false;
  isModerator: boolean = false;
  isUser: boolean = false;
  private resultMsg: string;

  constructor() { }

  ngOnInit() {
    $("#close-sidebar").click(function () {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function () {
      $(".page-wrapper").addClass("toggled");
    });
    this.validatePermissions();
  }

  validatePermissions() {
     
  }

}
