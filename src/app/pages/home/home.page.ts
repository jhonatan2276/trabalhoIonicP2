import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { DatabaseService } from './../../services/database.service';
import { LoadingController } from '@ionic/angular';
import { SyncService } from '../../services/sync.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //NgModel variables
  userName: string;
  userPassword: string;

  //Json data receiver
  admins: any;
  users: any;

  logginSucess: boolean;

  constructor (
    private service: GlobalService,
    private homeService: HomeService,
    private router: Router,
    private db: DatabaseService,
    private dataloading: LoadingController,
    private sync: SyncService
  ) {}

  login() {
    this.service.getServerAdmins()
    .subscribe(data => {
      this.admins = data;

      for (let admin of this.admins) {
        if ((admin.login == this.userName) && (admin.password == this.userPassword)) {
          this.service.adminTheme = admin.theme;
          this.service.authenticatedUser = true;
          this.logginSucess = true;
          this.loadUsersServer();
          this.sync.startSyncMonitor();
          break;
        } else {
          this.logginSucess = false;
        }
      }

      if (!this.logginSucess) {
        this.service.simpleAlert(
          "Usuário ou Senha Incorretos",
          "Falha de Login",
          "Tente Novamente"
        )
      }
    });
  }

  async loadUsersServer() {
    const loading = await this.dataloading.create({
      message: 'Baixando Dados...',
      spinner: 'circles',
      animated: true
    });

    await loading.present();
    
    this.service.getServerUsers()
    .subscribe(data => {this.users = data;

      this.db.clearDatabase();

      for (let i = 0; i < this.users.length; i++) {
        this.db.insertUser(
          this.users[i].id,
          this.users[i].name,
          this.users[i].email,
          this.users[i].dateBirth,
          this.users[i].photo,
          this.users[i].curriculum,
          this.users[i].status,
          this.users[i].theme
        )
      }
    });

    loading.dismiss();
    this.router.navigate(['/users-list']);
  }

  recoveryPassword() {
    this.homeService.recoveryPasswordAlert();
  }

  validateFields() {
    if (
      !this.userName ||
      !this.userPassword
    ) {
      return false
    } else {
      return true;
    }
  }
}
