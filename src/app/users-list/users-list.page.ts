import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../service/global.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTheme: string;
  userName: string

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.userName = this.service.userName;
    this.pageTheme = this.service.userTheme;
  }
}
