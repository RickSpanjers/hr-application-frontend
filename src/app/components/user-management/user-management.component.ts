import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/services/token.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service';
import { ArchiveOrRemoveUserDTO } from 'app/helpers/dto/usermanagement/ArchiveOrRemoveUserDTO';
import { Router } from '@angular/router';
import { UpdateRoleDTO } from 'app/helpers/dto/usermanagement/UpdateRoleDTO';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  private formContent: any = {};
  private errorMsgs: string[] = [];
  private userList: any = {} = [];
  private roleList: any = {} = [];
  private archivedUserList: any = {} = [];
  private archivedUsers = false;
  private usersInSystem = false;
  private resultMsg: string;

    //Misc variables
    private loading = false;
  
  constructor(private _tokenService: TokenService, private _router: Router, private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.loading = true;
    this._userService.retrieveUsers()
      .subscribe(
        data => {
          this.roleList.push("USER");
          this.roleList.push("MODERATOR");
          this.roleList.push("ADMINISTRATOR");
          this.usersInSystem = true;
          this.userList = data.data;
          console.log(data);
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  retrieveArchivedUsers() {
    this.loading = true;
    this._userService.retrieveArchivedUsers()
      .subscribe(
        data => {
          console.log(data);
          this.archivedUsers = true;
          this.archivedUserList = data.data;
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  updateUser(userId: any){
    console.log(userId);
   this._router.navigateByUrl("/profile/"+userId);
  }

  archiveOrUnarchiveUser(user: any, archive: string){
    console.log(user, archive);
    this.loading = true;
    let request = new ArchiveOrRemoveUserDTO(localStorage.getItem("ui"), user, archive);
    this._userService.ArchiveOrRemoveAccount(request)
      .subscribe(
        data => {
          console.log(data);
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  deleteUser(user: any){
    this.loading = true;
    let request = new ArchiveOrRemoveUserDTO(localStorage.getItem("ui"), user, "DELETE");
    this._userService.ArchiveOrRemoveAccount(request)
      .subscribe(
        data => {
          console.log(data);
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          console.log(error);
          this.loading = false;
        });
  }

  updateAccountRole(userId: any, role: string){
    this.loading = true;
    let request = new UpdateRoleDTO(userId, localStorage.getItem("ui"), role);
    console.log(request);
    this._userService.updateAccountRole(request)
      .subscribe(
        data => {
          this.resultMsg = data.message;
        },
        error => {
          this.errorMsgs.push(error);
          this.loading = false;
        });
  }

}
