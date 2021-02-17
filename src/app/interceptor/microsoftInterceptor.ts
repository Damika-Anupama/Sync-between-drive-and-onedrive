// /**
//  *@author : Damika Anupama Nanayakkara <damikaanupama@gmail.com>
//  *@since : 09/02/2021
//  **/
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class MicrosoftInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access_token');
    const newReq = req.clone({
      headers: new HttpHeaders('Authorization:Bearer ' + accessToken)
    });
    return next.handle(newReq).pipe(catchError(err => {
      // If the token is invalid or expired
      if (err.status === 401) {
        window.location.replace(
          'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=35501892-52c7-43d5-a59b-d6d61ff8d3ca&response_type=token&scope=api://35501892-52c7-43d5-a59b-d6d61ff8d3ca/Files.Read.All&state=damiboy&redirect_uri='
          + environment.redirectUrl);
      }
      throw (err);
    }));
  }

}
