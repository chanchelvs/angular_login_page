import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { RegisterService } from './register.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private registerService: RegisterService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required],
        phone: ['', Validators.required],
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^.*(?=.{8,})(?=.*[@#$%^&+=]).*$/)
          ]
        ],
        ConfirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^.*(?=.{8,})(?=.*[@#$%^&+=]).*$/)
          ]
        ]
      },
      { validator: this.passwordMatch }
    );
  }

  get f() {
    return this.form.controls;
  }

  passwordMatch(): ValidationErrors {
    if (this && this.form) {
      return this.form.controls['password'] ===
        this.form.controls['ConfirmPassword']
        ? { valid: true }
        : null;
    }
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      if (
        this.form.get('password').value !== this.form.get('ConfirmPassword')
      ) {
        this.alertService.error('Password Should be same');
      } else {
        return;
      }
    }
    this.loading = true;
    this.registerService.register(this.form.value).subscribe(data => {
      if (data && data?.success) {
        this.alertService.success(data.message, {
          keepAfterRouteChange: true
        });
        this.router.navigate(['../login'], { relativeTo: this.route });
      } else {
        this.alertService.error(data.message);
        this.loading = false;
      }
    });
  }
}
