import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';
import { DatabaseService } from './services/database.service';
import { SyncService } from './services/sync.service';

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
    private router: Router,
    private sync: SyncService,
    private menu: MenuController
  ) {
    this.initializeApp();
    this.backButtonMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.db.createDatabase();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backButtonMenu() {
    this.platform.backButton.subscribe(() => {
      if (this.menu.isOpen()) {
        this.menu.close();
      }
    });
  }

  newTeacher() {
    this.service.actionType = 1;
    this.router.navigate(['/user-edit']);
  }

  logout() {
    this.sync.dataSync();
    this.db.clearDatabase();
    this.router.navigate(['/home']);
    this.service.authenticatedUser = false;
    clearInterval(this.sync.syncMonitor);
  }
}
