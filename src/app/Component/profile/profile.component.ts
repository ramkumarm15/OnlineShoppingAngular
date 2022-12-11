import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private documentTitle: Title) {}

  private pageTitle: string = 'Account | User Regisration';

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
  }
}
