import { Injectable } from '@angular/core';
import { CONFIG } from '../config';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Util } from '../helpers/util';
import { catchError } from 'rxjs/operators';
import { AttendanceRequestDTO } from 'app/helpers/dto/attendancemanagement/AttendanceRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  retrieveAttendanceRequestUrl = CONFIG.baseUrls.retrieveAttendanceRequestUrl;
  attendanceRequestUrl = CONFIG.baseUrls.attendanceRequestUrl;

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return throwError(Util.createErrorMessage(error));
  }

   public requestAttendance(request: AttendanceRequestDTO) {
     console.log(request);
    return (this.http.post<any>(this.attendanceRequestUrl, request,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true')        .append('Access-Control-Allow-Credentials', 'true')
        .append("Content-Type","application/json"),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }

  public retrieveAttendance(userId: any) {
    return (this.http.get<any>(this.retrieveAttendanceRequestUrl + userId,
      {
        headers: new HttpHeaders({
        }).append('Access-Control-Allow-Origin', 'http://localhost:8080').append('Access-Control-Allow-Credentials', 'true'),
        responseType: 'json'
      }
    )).pipe(catchError(this.handleError));
  }
}
