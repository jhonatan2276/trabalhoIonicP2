import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../service/global.service';
import { HomeService } from '../service/home.service';

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

  constructor (private service: GlobalService, private homeService: HomeService, private router: Router) {}

  login() {
    this.service.getUsers()
    .subscribe(data => {
      this.data = data;

      console.log(this.data)

      for (let user of this.data) {
        if ((user.name == this.userName) && (user.password == this.userPassword)) {
          this.service.catchUserData(user.name, user.type, user.theme);
          this.router.navigate(['/users-list']);
          console.log(user.theme);
          break;
        } else {
          console.log("Erro")
          //alert("erro");
          //break;
        }
      }
    });
  }

  recoveryPassword() {
    this.homeService.recoveryPasswordAlert();
  }
}
