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
  userDateBirth: any;
  userCurriculum: string;
  userStatus: string;
  userTheme: string;

  dateText: any;
  dateDb: any;

  //Default User Photo
  defPhoto: string = '../../assets/default-user-photo/default-user.png';


  selectedUser: any;

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
    /*if (this.service.actionType == 1) {
      this.userDateBirth = null;
    } else {
      //Converts a Date to String and this String to ISO 8601 (to DateTime)
      this.dateText = moment(this.userDateBirth);   
      this.userDateBirth = moment(this.dateText.format(), moment.ISO_8601).format();    
    }*/
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
        //this.userDateBirth = this.dateToText(this.userDateBirth),
        this.userDateBirth,
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
        //this.userDateBirth = this.dateToText(this.userDateBirth),
        //this.userDateBirth = "2018-01-25",
        this.userDateBirth,
        this.defPhoto,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
      .then(() => {
        this.router.navigate(['/users-list']);
        this.service.toastAlert("Alterado com Sucesso", 2000, "bottom")
      })
      .catch(() => this.service.simpleAlert("Erro", "Erro ao Salvar", "Falha ao Salvar Usuário"))
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
  }
  
  cancel() {
    this.clearVariables();
    this.router.navigate(['/users-list']);
    this.service.toastAlert("Cancelado pelo Usuário", 2000, 'bottom')
  }

  dateToText(date) {
    this.dateDb = this.userDateBirth.year.text+'-'+this.userDateBirth.month.text+'-'+this.userDateBirth.day.text;
    alert(this.dateDb);
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
