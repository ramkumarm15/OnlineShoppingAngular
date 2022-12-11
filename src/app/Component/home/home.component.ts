import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private documentTitle: Title,
    private user: UserService
  ) { }

  private pageTitle = 'Home | User Registration';

  name: string = '';
  id: number = 0;
  data: any;

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);

    if (this.auth.getUserToken() != null) {
      this.name = this.user.preferredUserName;
      this.id = this.user.id;
    }
  }
}
