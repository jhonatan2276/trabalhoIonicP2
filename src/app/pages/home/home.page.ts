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
    this.service.getUsers()
    .subscribe(data => {
      this.data = data;

      console.log(this.data)

      for (let user of this.data) {
        if ((user.name == this.userName) && (user.password == this.userPassword)) {
          this.service.catchUserData(user.name, user.theme);
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
}
