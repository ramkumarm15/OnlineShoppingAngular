import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserResponse} from 'src/app/Model/user';
import {UserService} from 'src/app/Service/user.service';
import {compare} from 'src/app/shared/utils/validators';
import {duration, Notify} from "../../../../Model/notify";
import {NotificationComponent} from "../../../../shared/notification/notification.component";
import {NotifyService} from "../../../../Service/notify.service";

function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    console.log(formGroup);
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    console.log(matchingControl);
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}

@Component({
  selector: 'app-tab-password',
  templateUrl: './tab-password.component.html',
  styleUrls: ['./tab-password.component.css'],
})
export class TabPasswordComponent implements OnInit {
  passwordHide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private notify: NotifyService
  ) {
  }

  loading: boolean = false;
  submitted: boolean = false;

  changePasswordForm: FormGroup = this.fb.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {validators: compare('newPassword', 'confirmPassword')}
  );

  ngOnInit(): void {
  }

  onPasswordSubmit(): void {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.user
          .updateUserPassword(
            this.changePasswordForm.value
          )
          .subscribe({
            next: (res: UserResponse) => {
              this.notify.success(res.message);
              this.loading = false;
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              if (err.status == 400) {
                this.notify.warning(err.error.message);
                this.loading = false;
              }
            },
          });
      }, 2000);
    }
  }
}


