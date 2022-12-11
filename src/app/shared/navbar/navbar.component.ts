import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/Service/auth.service';
import {UserService} from 'src/app/Service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = '';
  id: number = 0;

  constructor(private user: UserService, private auth: AuthService) {
  }

  ngOnInit(): void {
    if (this.auth.getUserToken() != null) {
      this.name = this.user.preferredUserName;
      this.id = this.user.id;
    } else {
      this.name = "User";
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
