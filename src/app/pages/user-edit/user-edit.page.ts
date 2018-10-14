import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

  //NgModel variables
  id: string;
  userName: string;
  userEmail: string;
  userDateBirth: string;
  userCurriculum: string;
  userStatus: string;
  userTheme: string;

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.service.editUserId;
    this.userName = this.service.editUserName;
    this.userEmail = this.service.editUserEmail;
    this.userDateBirth = this.service.edirUserDateBirth;
    this.userCurriculum = this.service.editUserCurriculum;
    this.userStatus = this.service.editUserStatus;
    this.userTheme = this.service.editUserTheme;
  }

  save() {
    if (this.service.actionType == 1) {
      this.service.postUser(
        this.userName,
        this.userEmail,
        this.userDateBirth,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      );
    } else {
      this.service.putUser(
        this.id,
        this.userName,
        this.userEmail,
        this.userDateBirth,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
    }
    this.clearVariables();
  }
  
  cancel() {
    this.clearVariables();
    this.router.navigate(['/users-list']);
    this.service.toastAlert("Cancelado pelo Usuário", 2000, 'bottom')
  }

  clearVariables() {
    this.service.editUserId = "";
    this.service.editUserName = "";
    this.service.editUserEmail = "";
    this.service.edirUserDateBirth = "";
    this.service.editUserCurriculum = "";
    this.service.editUserStatus = "";
    this.service.editUserTheme = "";
  }
}
