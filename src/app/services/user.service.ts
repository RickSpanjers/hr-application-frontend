import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Util } from '../helpers/util';
import { catchError } from 'rxjs/operators';
import { LoginDTO } from 'app/helpers/dto/usermanagement/LoginDTO';
import { UpdateProfileDTO } from 'app/helpers/dto/usermanagement/UpdateProfileDTO';
import { UpdatePasswordDTO } from 'app/helpers/dto/usermanagement/UpdatePasswordDTO';
import { AddProfileElementDTO } from 'app/helpers/dto/usermanagement/AddProfileElementDTO';
import { RemoveProfileElementDTO } from 'app/helpers/dto/usermanagement/RemoveProfileElementDTO';
import { ArchiveOrRemoveUserDTO } from 'app/helpers/dto/usermanagement/ArchiveOrRemoveUserDTO';
import { AddAccountDTO } from 'app/helpers/dto/usermanagement/AddAccountDTO';
import { UpdateRoleDTO } from 'app/helpers/dto/usermanagement/UpdateRoleDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  updateProfileUrl = CONFIG.baseUrls.updateProfileRequestUrl;
  changePasswordUrl = CONFIG.baseUrls.changePasswordRequestUrl;
  retrieveProfileUrl = CONFIG.baseUrls.retrieveProfileRequestUrl;
  retrieveEducationUrl = CONFIG.baseUrls.retrieveEducationRequestUrl;
  retrieveSkillUrl = CONFIG.baseUrls.retrieveSkillRequestUrl;
  retrieveLanguageUrl = CONFIG.baseUrls.retrieveLanguageRequestUrl;
  retrieveExperienceUrl = CONFIG.baseUrls.retrieveExperienceRequestUrl;
  addProfileElementUrl = CONFIG.baseUrls.addProfileElementRequestUrl;
  removeProfileElementUrl = CONFIG.baseUrls.removeProfileElementRequestUrl;
  retrieveUsersFromCompanyUrl = CONFIG.baseUrls.retrieveUsersFromCompanyRequestUrl;
  retrieveArchivedUsersFromCompanyUrl = CONFIG.baseUrls.retrieveArchivedUsersFromCompanyRequestUrl;
  retrieveUsersUrl = CONFIG.baseUrls.retrieveUsersRequestUrl;
  retrieveArchivedUsersUrl = CONFIG.baseUrls.retrieveArchivedUsersRequestUrl;
  archiveOrRemoveAccountUrl = CONFIG.baseUrls.archiveOrRemoveAccountRequestUrl;
  addAccountUrl = CONFIG.baseUrls.addAccountRequestUrl;
  updateAccountRoleUrl = CONFIG.baseUrls.updateAccountRoleRequestUrl;
  retrieveDashboardUrl = CONFIG.baseUrls.retrieveDashboardRequestUrl;

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return throwError(Util.createErrorMessage(error));
  }

  public updateProfile(updateRequest: UpdateProfileDTO) {
    return (this.http.post<any>(this.updateProfileUrl, updateRequest,
    )).pipe(catchError(this.handleError));
  }

  public retrieveProfile(userId: any) {
    console.log(this.retrieveProfileUrl + userId);
    return (this.http.get<any>(this.retrieveProfileUrl + userId,
    )).pipe(catchError(this.handleError));
  }

  public changePassword(updateRequest: UpdatePasswordDTO) {
    return (this.http.post<any>(this.changePasswordUrl, updateRequest,
    )).pipe(catchError(this.handleError));
  }

  public addProfileElement(request: AddProfileElementDTO) {
    return (this.http.post<any>(this.addProfileElementUrl, request,
    )).pipe(catchError(this.handleError));
  }

  public removeProfileElement(request: RemoveProfileElementDTO) {
    return (this.http.post<any>(this.removeProfileElementUrl, request,
    )).pipe(catchError(this.handleError));
  }

  public retrieveUsersFromCompany(companyId: any) {
    return (this.http.get<any>(this.retrieveUsersFromCompanyUrl + companyId,
    )).pipe(catchError(this.handleError));
  }

  public retrieveArchivedUsersFromCompany(userId: any) {
    return (this.http.get<any>(this.retrieveArchivedUsersFromCompanyUrl + userId,
    )).pipe(catchError(this.handleError));
  }

  public retrieveUsers() {
    return (this.http.get<any>(this.retrieveUsersUrl,
    )).pipe(catchError(this.handleError));
  }

  public retrieveArchivedUsers() {
    return (this.http.get<any>(this.retrieveArchivedUsersUrl,
    )).pipe(catchError(this.handleError));
  }

  public ArchiveOrRemoveAccount(request: ArchiveOrRemoveUserDTO) {
    return (this.http.post<any>(this.archiveOrRemoveAccountUrl, request,
    )).pipe(catchError(this.handleError));
  }

  public addAccount(request: AddAccountDTO) {
    return (this.http.post<any>(this.addAccountUrl, request,
    )).pipe(catchError(this.handleError));
  }

  public updateAccountRole(request: UpdateRoleDTO) {
    return (this.http.post<any>(this.updateAccountRoleUrl, request,
    )).pipe(catchError(this.handleError));
  }
  
  public retrieveDashboardData(userId: any) {
    return (this.http.get<any>(this.retrieveDashboardUrl + userId,
    )).pipe(catchError(this.handleError));
  }

}
