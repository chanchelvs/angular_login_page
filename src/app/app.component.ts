import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { LoginOutputModel } from './account/login.model';
import { LoginService } from './_services/login.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: LoginOutputModel;

    constructor(private loginService: LoginService) {
        this.loginService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.loginService.logout();
    }
}
