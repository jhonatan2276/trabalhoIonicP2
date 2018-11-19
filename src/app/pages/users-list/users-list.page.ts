import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { DatabaseService } from './../../services/database.service';
import { LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTheme: string;
  users: any[] = [];
  selectedUser: any;

  //NgModel variables
  searchText: string;
  notShowClaerButton: boolean;

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService,
    private dataloading: LoadingController,
    private keyboard: Keyboard
  ) { }

  ngOnInit() {
    this.pageTheme = this.service.adminTheme;

    this.getUsers();
  }

  async getUsers() {
    const loading = await this.dataloading.create({
      message: 'Carregando Dados...',
      spinner: 'circles',
      animated: true
    });

    await loading.present();
    
    this.db.getUsers()
    .then((result: any[]) => {
      this.users = result;
    });

    loading.dismiss();
    this.notShowClaerButton = true;
    this.searchText = null;
  }

  doRefresh(event) {
    this.getUsers();

    event.target.complete();
  }

  searchUser() {
    this.db.searchUsers(this.searchText)
    .then((result: any[]) => {
      this.users = result;
    });
    this.notShowClaerButton = false;
    this.keyboard.hide();
  }

  usersDetail(userId) {
    this.service.userId = userId;
    this.router.navigate(['/user-detail']);
  }

  editUser(userId) {
    this.db.getUserById(userId)
    .then((result: any[]) => {this.selectedUser = result;

    this.service.catchUserDataEdit(
      this.selectedUser[0].id,
      this.selectedUser[0].id_server,
      this.selectedUser[0].name,
      this.selectedUser[0].email,
      this.selectedUser[0].dateBirth,
      this.selectedUser[0].photo,
      this.selectedUser[0].curriculum,
      this.selectedUser[0].status,
      this.selectedUser[0].theme
    )
      this.service.actionType = 2;
      this.router.navigate(['/user-edit']);
    })
  }

  deleteUser(id, idServer) {
    this.service.deleteUser(id, idServer);
  }
}
