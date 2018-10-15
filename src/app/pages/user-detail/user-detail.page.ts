import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: string;
  selectedUser: any;
  dateString: string;

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.service.userId;

    this.service.getUserDetail(this.userId)
    .subscribe(data => {this.selectedUser = data
    this.dateToString();
    });
  }

  dateToString() {
    this.dateString = this.selectedUser.dateBirth.day.text+"/";
    this.dateString = this.dateString+this.selectedUser.dateBirth.month.text+"/"
    this.dateString = this.dateString+this.selectedUser.dateBirth.year.text;
  }

  editUser() {
    this.service.catchUserDataEdit(
      this.selectedUser.id,
      this.selectedUser.name,
      this.selectedUser.email,
      this.selectedUser.dateBirth,
      this.selectedUser.curriculum,
      this.selectedUser.status,
      this.selectedUser.theme
    )
    this.service.actionType = 2;
    this.router.navigate(['/user-edit']);
  }

  deleteUser(id) {
    this.service.deleteUser(id);
  }
}
