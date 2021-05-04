import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { LoginService } from '../_services/login.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.loginService.login(this.form.value).subscribe(data => {
      if (data && data?.success) {
        const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
        console.log(returnUrl);
        this.router.navigateByUrl(returnUrl);
      } else {
        this.alertService.error(data.message);
        this.loading = false;
      }
    });
  }
}
