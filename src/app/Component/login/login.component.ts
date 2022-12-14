import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

// Services
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/Service/auth.service';

// Material Component
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginResponse} from "../../Model/auth";
import {duration, Notify} from "../../Model/notify";
import {NotificationComponent} from "../../shared/notification/notification.component";
import {NotifyService} from "../../Service/notify.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private documentTitle: Title,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private notify: NotifyService
  ) {
  }

  public passwordHide: boolean = true;
  private returnUrl!: string;
  private pageTitle: string = "Login | Online Shopping for Men & Women Shoes"

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  private snackBar(message: string, type: Notify): void {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: duration * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: {
        message,
        type
      }
    })
  }

  /**
   * login form for get user info
   */
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * send a request to auth service to make HTTP POST request
   * if form is valid
   */
  formSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (data: LoginResponse) => {
          console.log(data);
          localStorage.setItem('access_token', data.accessToken);
          this.auth.isLoggedIn = true;
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 400) {
            this.notify.error(error.error.message);
          } else {
            this.notify.error(error.error.message);
          }
        },
      });
    }
  }
}

