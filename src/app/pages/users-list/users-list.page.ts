import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { DatabaseService } from './../../services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTheme: string;
  adminName: string;
  users: any[] = [];
  selectedUser: any;

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService,
    private dataloading: LoadingController
  ) { }

  ngOnInit() {
    this.adminName = this.service.adminName;
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
  }

  doRefresh(event) {
    this.getUsers();
    
    event.target.complete();
  }

  usersDetail(userId) {
    this.service.userId = userId;
    this.router.navigate(['/user-detail']);
  }

  editUser(userId) {
    this.service.getUserDetail(userId)
    .subscribe(data => {this.selectedUser = data
    this.service.actionType = 2;
    this.service.catchUserDataEdit(
      this.selectedUser.id,
      this.selectedUser.name,
      this.selectedUser.email,
      this.selectedUser.dateBirth,
      this.selectedUser.curriculum,
      this.selectedUser.status,
      this.selectedUser.theme
    )
    this.router.navigate(['/user-edit']);
    });
  }

  deleteUser(id) {
    this.service.deleteUser(id);
  }
}
