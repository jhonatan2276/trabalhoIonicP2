import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';

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
  data: any;

  logginSucess: boolean;

  constructor (
    private service: GlobalService,
    private homeService: HomeService,
    private router: Router
  ) {}

  login() {
    this.service.getAdmins()
    .subscribe(data => {
      this.data = data;

      for (let admin of this.data) {
        if ((admin.login == this.userName) && (admin.password == this.userPassword)) {
          this.service.catchUserData(admin.name, admin.theme);
          this.router.navigate(['/users-list']);
          this.logginSucess = true;
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
