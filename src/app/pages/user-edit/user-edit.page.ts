import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../../services/database.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

  //NgModel variables
  id: number;
  userIdServer: number;
  userName: string;
  userEmail: string;
  userDateBirth: string;
  userCurriculum: string;
  userStatus: string;
  userTheme: string;

  //Default User Photo
  defPhoto: string = '../../assets/default-user-photo/default-user.png';

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.id = this.service.editUserId;
    this.userIdServer = this.service.editUserIdServer;
    this.userName = this.service.editUserName;
    this.userEmail = this.service.editUserEmail;
    this.userDateBirth = this.service.edirUserDateBirth;
    //Converts a Date to String and a String to ISO 8601 (to DateTime)
    var dateText = moment(this.userDateBirth);     
    this.userDateBirth = moment(dateText.format(), moment.ISO_8601).format();
    this.userCurriculum = this.service.editUserCurriculum;
    this.userStatus = this.service.editUserStatus;
    this.userTheme = this.service.editUserTheme;
  }

  save() {
    //IF NEW USER
    if (this.service.actionType == 1) {
      this.db.insertUser(
        null,
        this.userName,
        this.userEmail,
        this.userDateBirth = this.dateToText(this.userDateBirth),
        this.defPhoto,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
      .then(() => {
        this.router.navigate(['/users-list']);
        this.service.toastAlert("Salvo com Sucesso", 2000, "bottom");
      })
      .catch(() => this.service.simpleAlert("Erro", "Erro ao Salvar", "Falha ao Salvar Usuário"))
      /*this.service.postUser(
        this.userName,
        this.userEmail,
        this.userDateBirth,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      );*/
    } else {
      //IF EDIT USER
      this.db.updateUser(
        this.id,
        this.userIdServer,
        this.userName,
        this.userEmail,
        this.userDateBirth = this.dateToText(this.userDateBirth),
        this.defPhoto,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
      .then(() => {
        this.router.navigate(['/users-list']);
        this.service.toastAlert("Alterado com Sucesso", 2000, "bottom")
      })

      /*this.service.putUser(
        this.id,
        this.userName,
        this.userEmail,
        this.userDateBirth,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )*/
    }
    this.clearVariables();
    //alert(new Date(this.userDateBirth).toISOString());
  }
  
  cancel() {
    this.clearVariables();
    this.router.navigate(['/users-list']);
    this.service.toastAlert("Cancelado pelo Usuário", 2000, 'bottom')
  }

  dateToText(date) {
    this.userDateBirth = date.year.text+'-'+date.month.text+'-'+date.day.text;
    return this.userDateBirth;
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
