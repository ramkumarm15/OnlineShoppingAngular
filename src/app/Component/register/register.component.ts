import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/Service/auth.service';
import {UserResponse} from "../../Model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationComponent} from "../../shared/notification/notification.component";
import {duration, Notify} from "../../Model/notify";
import {NotifyService} from "../../Service/notify.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService,
    private documentTitle: Title
  ) {
  }

  passwordHide: boolean = true;

  private pageTitle: string = "Create account | Online Shopping for Men & Women Shoes"

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
  }

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required, Validators.minLength(8)]],
    emailAddress: ['', [Validators.required, Validators.email]],
    city: ['', [Validators.required]],
    about: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
  });

  formSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (data: UserResponse) => {
          console.log(data);
          this.notify.success(data.message);
          this.router.navigate(['/login']);

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 400) {
            this.notify.error(error.error.message);
          } else {
            this.notify.error(error.statusText);
          }
        },
      });
    }
  }
}
