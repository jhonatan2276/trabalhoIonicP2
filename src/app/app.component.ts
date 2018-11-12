import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public menuItens = [
    {
      title: 'Professores',
      url: '/users-list',
      icon: 'people'
    },
    {
      title: 'Turmas',
      url: '/classes-list',
      icon: 'book'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private service: GlobalService,
    private db: DatabaseService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.createDatabase();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  newTeacher() {
    this.service.actionType = 1;
    this.router.navigate(['/user-edit']);
  }

  logout() {
    this.router.navigate(['/home']);
    this.service.authenticatedUser = false;
  }
}
