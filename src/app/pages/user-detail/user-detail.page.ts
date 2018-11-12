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

  //RealTime Variables
  userStatusText: string;
  userStatusColor: string;

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.service.userId;

    this.service.getUserDetail(this.userId)
    .subscribe(data => {this.selectedUser = data
    this.dateToString(this.selectedUser.dateBirth)
    this.userStatusToString(this.selectedUser.status)
    });
  }

  dateToString(date) {
    this.dateString = date.day.text+"/";
    this.dateString = this.dateString+date.month.text+"/"
    this.dateString = this.dateString+date.year.text;
  }

  userStatusToString (status) {
    console.log(status)
    if (status == "1") {
      this.userStatusText = "Ativo"
      this.userStatusColor = "success"
    } else {
      this.userStatusText = "Inativo"
      this.userStatusColor = "danger"
    }
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
