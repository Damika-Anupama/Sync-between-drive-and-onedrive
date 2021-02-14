// /**
//  *@author : Damika Anupama Nanayakkara <damikaanupama@gmail.com>
//  *@since : 08/02/2021
//  **/
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Base64} from 'js-base64';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  readonly BASE_URL: string = 'https://www.googleapis.com/auth/drive.file';

  constructor(private http: HttpClient) {}

  authenticateDrive(): void {

  }
  authenticateOneDrive(): void {

  }
  getFilesDrive(): void{
  }
  getFilesOneDrive(): void{
  }
}
