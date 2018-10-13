import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTheme: string;
  userName: string;
  users: any;

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userName = this.service.userName;
    this.pageTheme = this.service.userTheme;

    this.service.getUsers()
    .subscribe(data => {this.users = data;
    });
  }

  doRefresh(event) {
    this.service.getUsers()
    .subscribe(data => {this.users = data;
    
    event.target.complete();
    });
  }

  usersDetail(userId) {
    this.service.userId = userId;
    this.router.navigate(['/user-detail']);
  }

  deleteUser(id) {
    this.service.deleteUser(id);
  }
}
