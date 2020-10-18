import { Injectable } from "@angular/core";

import { HttpErrorResponse } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/common/http';

import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import { API_URL } from '../_shared/API_URLS.const';
// import { RCMasterDataResponse } from "../_shared/rcm-master-data-response";
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
