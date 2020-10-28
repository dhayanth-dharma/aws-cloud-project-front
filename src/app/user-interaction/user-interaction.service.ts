import { Injectable } from "@angular/core";

import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable()
export class UserInteractionService {
  localUrl: any = "http://localhost:8081/api/interupt/1";
  localUrl2: any = "http://localhost:8081/api/interupt/0";
  localUrl3: any = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }
  getStatus(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.localUrl, { observe: 'response' });
  }
  stopCommand(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.localUrl, { observe: 'response' });
  }
  startCommand(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.localUrl2, { observe: 'response' });
  }
  downloadImage(key: any): Observable<HttpResponse<any>> {
    let p = new HttpParams();
    p = p.append('file', key);
    return this.http.get<any>(
      this.localUrl3 + "s3/download", { params: p, observe: 'response' });
  }
  downloadFilev(key: string): Observable<any> {
    let p = new HttpParams();
    p = p.append('file', key);
    return this.http.get(this.localUrl3 + "s3/download",
      { params: p, responseType: 'blob' as 'json' });
  }
  sendNumberList(numList): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.localUrl3 + "sqs/num_l", numList, { observe: 'response' });
  }
  uploadImage(object): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.localUrl3 + "s3/upload", object, { observe: 'response' });
  }
  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}
