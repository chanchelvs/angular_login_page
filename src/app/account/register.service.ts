import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel, RegisterOutputModel } from './register.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}
  public register(registerModel: RegisterModel): Observable<any> {
    return this.http.post(
      'https://devgroceryapi.spericorn.com/api/auth/register/', registerModel
    );
  }

  public checkMail(email: string): Observable<any> {
    return this.http.post(
      'https://devgroceryapi.spericorn.com/api/auth/checkMail', email
    );
  }


}
