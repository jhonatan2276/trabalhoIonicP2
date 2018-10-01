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

  constructor (private service: GlobalService, private homeService: HomeService, private router: Router) {}

  recoveryPassword() {
    this.homeService.recoveryPasswordAlert();
  }
}
