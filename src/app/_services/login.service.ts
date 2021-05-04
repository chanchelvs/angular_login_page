import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInputModel, LoginOutputModel } from '../account/login.model';
import { User } from '@app/_models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<LoginOutputModel>;
  public user: Observable<LoginOutputModel>;
  constructor(private http: HttpClient,
    private router: Router) {
    this.userSubject = new BehaviorSubject<LoginOutputModel>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): LoginOutputModel {
    return this.userSubject.value;
  }
  public login(loginModel: LoginInputModel): Observable<any> {
    return this.http.post<LoginOutputModel>(
      'https://devgroceryapi.spericorn.com/api/auth/login', loginModel
    )
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
  }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
}

}
