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
  userDateBirth: any;
  userCurriculum: string;
  userStatus: number;
  userTheme: string;

  userDateBirthText: any;

  constructor(
    private service: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.service.editUserId;
    this.userName = this.service.editUserName;
    this.userEmail = this.service.editUserEmail;
    this.userDateBirth = this.service.edirUserDateBirth;


    //let dateString = this.userDateBirth.split("/").reverse().join("/");
    //let newDate = new Date(dateString);

    //this.userDateBirth = new Date(this.service.edirUserDateBirth.split("/").reverse().join("/")).toISOString();


    //this.userDateBirth = newDate.toISOString();
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
    alert(new Date(this.userDateBirth).toISOString());
  }
  
  cancel() {
    this.clearVariables();
    this.router.navigate(['/users-list']);
    this.service.toastAlert("Cancelado pelo Usuário", 2000, 'bottom')
  }

  extractDateText(date) {
    var dateText = date.day.text+"/"+date.month.text+"/"+date.year.text;
    return dateText;
  }

  clearVariables() {
    this.service.editUserId = null;
    this.service.editUserName = null;
    this.service.editUserEmail = null;
    this.service.edirUserDateBirth = null;
    this.service.editUserCurriculum = null;
    this.service.editUserStatus = null;
    this.service.editUserTheme = null;
  }

  validateFields() {
    if (
      !this.userName ||
      !this.userEmail ||
      !this.userDateBirth ||
      !this.userCurriculum ||
      !this.userStatus ||
      !this.userTheme
    ) {
      return false
    } else {
      return true;
    }
  }
}
