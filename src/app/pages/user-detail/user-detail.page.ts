import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../../services/database.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: string;
  selectedUser: any[] = [];
  dateString: string;

  //RealTime Variables
  userStatusText: string;
  userStatusColor: string;

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.userId = this.service.userId;

    this.db.getUserById(this.userId)
    .then((result: any[]) => {
      this.selectedUser = result;

      //this.dateToString(this.selectedUser.dateBirth)
      this.userStatusToString(this.selectedUser[0].status);
    });




    /*this.service.getUserDetail(this.userId)
    .subscribe(data => {this.selectedUser = data
    this.dateToString(this.selectedUser.dateBirth)
    this.userStatusToString(this.selectedUser.status)
    });*/
  }

  dateToString(date) {
    this.dateString = date.day.text+"/";
    this.dateString = this.dateString+date.month.text+"/"
    this.dateString = this.dateString+date.year.text;
  }

  userStatusToString (status) {
    console.log(status)
    if (status == "true") {
      this.userStatusText = "Ativo"
      this.userStatusColor = "success"
    } else {
      this.userStatusText = "Inativo"
      this.userStatusColor = "danger"
    }
  }

  editUser() {
    this.service.catchUserDataEdit(
      this.selectedUser[0].id,
      this.selectedUser[0].id_server,
      this.selectedUser[0].name,
      this.selectedUser[0].email,
      this.selectedUser[0].dateBirth,
      this.selectedUser[0].curriculum,
      this.selectedUser[0].status,
      this.selectedUser[0].theme
    )
    this.service.actionType = 2;
    this.router.navigate(['/user-edit']);
  }

  deleteUser(id) {
    this.service.deleteUser(id);
  }
}
