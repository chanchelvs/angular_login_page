import { Component } from '@angular/core';
import { LoginOutputModel } from '@app/account/login.model';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { LoginService } from '@app/_services/login.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: LoginOutputModel;

    constructor(private loginService: LoginService) {
        this.user = this.loginService.userValue;
    }
}
