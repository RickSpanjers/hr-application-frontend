import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Util } from '../helpers/util';
import { catchError } from 'rxjs/operators';
import { AbsenceRequestDTO } from 'app/helpers/dto/absencemanagement/AbsenceRequestDTO';
import { CancelRequestDTO } from 'app/helpers/dto/absencemanagement/CancelRequestDTO';
import { UpdateAbsenceStatusDTO } from 'app/helpers/dto/absencemanagement/UpdateAbsenceStatusDTO';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  loginUrl = CONFIG.baseUrls.loginRequestUrl;
  absenceRequestUrl = CONFIG.baseUrls.absenceRequestUrl;
  retrieveAbsenceRequestUrl = CONFIG.baseUrls.retrieveAbsenceRequestUrl;
  cancelAbsenceRequestUrl = CONFIG.baseUrls.cancelRequestUrl;
  retrieveOpenAbsenceRequestUrl = CONFIG.baseUrls.retrieveOpenAbsenceRequestUrl;
  updateAbsenceStatusRequestUrl = CONFIG.baseUrls.updateAbsenceStatusRequestUrl;
  retrieveOpenAbsenceRequestsDashboardUrl = CONFIG.baseUrls.retrieveOpenAbsenceRequestsDashboardUrl;
  retrieveDashboardAbsenceDataUrl = CONFIG.baseUrls.retrieveDashboardAbsenceDataUrl;

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return throwError(Util.createErrorMessage(error));
  }

   public requestAbsence(request: AbsenceRequestDTO) {
    return (this.http.post<any>(this.absenceRequestUrl, request,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }
  
  public cancelAbsence(request: CancelRequestDTO) {
    return (this.http.post<any>(this.cancelAbsenceRequestUrl, request,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveOpenAbsenceList(companyId: any) {
    return (this.http.get<any>(this.retrieveOpenAbsenceRequestUrl + companyId,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveAbsences(userId: any) {
    console.log(this.retrieveAbsenceRequestUrl + userId);
    return (this.http.get<any>(this.retrieveAbsenceRequestUrl + userId,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public updateAbsenceStatus(request: UpdateAbsenceStatusDTO) {
    return (this.http.post<any>(this.updateAbsenceStatusRequestUrl, request,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveDashboardAbsenceData(companyId: any) {
    return (this.http.get<any>(this.retrieveDashboardAbsenceDataUrl + companyId,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveDashboardOpenRequestData(companyId: any) {
    return (this.http.get<any>(this.retrieveOpenAbsenceRequestsDashboardUrl + companyId,
      {
        headers: new HttpHeaders({
        }).append('HR_Token', "temp").append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }
}
