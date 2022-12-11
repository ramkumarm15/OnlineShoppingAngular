import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {User, UserResponse} from 'src/app/Model/user';
import {UserService} from 'src/app/Service/user.service';

@Component({
  selector: 'app-tabProfile',
  templateUrl: './tabProfile.component.html',
  styleUrls: ['./tabProfile.component.css'],
})
export class TabProfileComponent implements OnInit {

  loading: boolean = false;
  dataLoading: boolean = false;
  durationInSec: number = 1.5;
  horizontalPosition: MatSnackBarHorizontalPosition = "end"
  verticalPosition: MatSnackBarVerticalPosition = "top";


  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private _snackBar: MatSnackBar
  ) {
  }

  userProfileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    emailAddress: ['', [Validators.required, Validators.email]],
    about: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.maxLength(200)]],
  });

  private setFormValue(data: User): void {
    this.userProfileForm.get('name')?.setValue(data.name);
    this.userProfileForm.get('emailAddress')?.setValue(data.emailAddress);
    this.userProfileForm.get('about')?.setValue(data.about);
    this.userProfileForm.get('city')?.setValue(data.city);
  }

  ngOnInit() {
    if (this.user.userData == null) {
      this.getUserData();
    } else {
      this.setFormValue(this.user.userData);
    }
  }

  private getUserData(): void {
    this.user.getMe().subscribe({
      next: (res: User) => {
        this.user.userData = res;
        this.setFormValue(this.user.userData);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar(err.error.message);
      },
    });
  }

  private snackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: this.durationInSec * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onFormSubmit(): void {
    console.log(this.userProfileForm.value);
    if (this.userProfileForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.user
          .updateUserData(this.userProfileForm.value)
          .subscribe({
            next: (res: UserResponse) => {
              this.getUserData();
              this.snackBar(res.message);
              this.loading = false;
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar(err.error.message);
            },
          });
      }, 2000);
    }
  }
}

