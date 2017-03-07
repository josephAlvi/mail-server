import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import { Observable } from 'rxjs/Rx';


/*
  Generated class for the MailService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MailService {

  constructor(public http: Http) {
    console.log('Hello MailService Provider');
  }

  public sendMail(mailParams: any): Observable<void> {
    let requestHeader = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({ headers: requestHeader });
    return this.http.post('http://localhost:8100/mailServer/Mail', mailParams, requestOptions)
      .map((resp) => {
        console.log(resp.json());
        return resp.json();
      })
      // .catch((error: any) => Observable.throw(error.json() || { message: 'Error', details: 'Server Error' }));
      .catch((error: any) => {
        console.error(error);
        return Observable.throw(error.json() || { message: error.message, detail: error.detail })
      });
  };

}
