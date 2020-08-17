import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Util } from '../helpers/util';
import { catchError } from 'rxjs/operators';
import { AddUpdateCompanyDTO } from 'app/helpers/dto/companymanagement/AddUpdateCompanyDTO';
import { AddUpdateFunctionDTO } from 'app/helpers/dto/companymanagement/AddUpdateFunctionDTO';
import { RetrieveCompanyDashboardDTO } from 'app/helpers/dto/companymanagement/RetrieveCompanyDashboardDTO';
import {DeleteFunctionDTO} from 'app/helpers/dto/companymanagement/DeleteFunctionDTO';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  retrieveCompanyUrl = CONFIG.baseUrls.retrieveCompanyUrl;
  retrieveCompaniesUrl = CONFIG.baseUrls.retrieveCompaniesUrl;
  retrieveCompanyFunctionUrl = CONFIG.baseUrls.retrieveCompanyFunctionUrl;
  retrieveCompanyFunctionsUrl = CONFIG.baseUrls.retrieveCompanyFunctionsUrl;
  retrieveArchivedCompaniesUrl = CONFIG.baseUrls.retrieveArchivedCompaniesUrl;
  addCompanyUrl = CONFIG.baseUrls.addCompanyUrl;
  archiveCompanyUrl = CONFIG.baseUrls.archiveCompanyUrl;
  updateCompanyUrl = CONFIG.baseUrls.updateCompanyUrl;
  addCompanyFunctionUrl = CONFIG.baseUrls.addCompanyFunctionUrl;
  deleteCompanyFunctionUrl = CONFIG.baseUrls.deleteCompanyFunctionUrl;
  archiveCompanyFunctionUrl = CONFIG.baseUrls.archiveCompanyFunctionUrl;
  updateCompanyFunctionUrl = CONFIG.baseUrls.updateCompanyFunctionUrl;
  retrieveDashboardCompanyDataUrl = CONFIG.baseUrls.retrieveDashboardCompanyDataUrl;

  private handleError(error: Response) {
    console.error(error);
    return throwError(Util.createErrorMessage(error));
  }

  public retrieveCompany(companyId: any) {
    return (this.http.get<any>(this.retrieveCompanyUrl + companyId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

   public retrieveCompanyFunctions(companyId: any) {
    return (this.http.get<any>(this.retrieveCompanyFunctionsUrl + companyId + "/all",
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveCompanyFunction(functionId: any) {
    return (this.http.get<any>(this.retrieveCompanyFunctionUrl + functionId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveCompanies(administratorId: any) {
    return (this.http.get<any>(this.retrieveCompaniesUrl + administratorId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveArchivedCompanies(administratorId: any) {
    return (this.http.get<any>(this.retrieveArchivedCompaniesUrl + administratorId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public addCompany(request: AddUpdateCompanyDTO) {
    return (this.http.post<any>(this.addCompanyUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public archiveCompany(companyId: any) {
    return (this.http.post<any>(this.archiveCompanyUrl, companyId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public updateCompany(request: AddUpdateCompanyDTO) {
    return (this.http.post<any>(this.updateCompanyUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public addCompanyFunction(request: AddUpdateFunctionDTO) {
    return (this.http.post<any>(this.addCompanyFunctionUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public DeleteCompanyFunction(request: DeleteFunctionDTO) {
    console.log("request sent");
    console.log(JSON.stringify(request));
    return (this.http.post<any>(this.deleteCompanyFunctionUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080')
        .append('Access-Control-Allow-Credentials', 'true')
        .append("Content-Type","application/json"),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public updateCompanyFunction(request: AddUpdateFunctionDTO) {
    return (this.http.post<any>(this.updateCompanyFunctionUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveDashboardData(companyId: any, functionId: any) {
    let request = new RetrieveCompanyDashboardDTO(companyId, functionId);
    console.log(JSON.stringify(request));
    return (this.http.post<any>(this.retrieveDashboardCompanyDataUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }
}
