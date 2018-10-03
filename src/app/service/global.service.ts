import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url: string = "http://localhost:3000/users";
  userName: string
  userTheme: string;
  userType: number;

  constructor(private http: HttpClient, private alert: AlertController, private router: Router) { }

  async simpleAlert(title, subtitle, text) {
    const alert = await this.alert.create({
      header: title,
      subHeader: subtitle,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  getUsers() {
    return this.http.get(this.url)
  }

  catchUserData(name, type, theme) {
    this.userName = name;
    this.userType = type;
    this.userTheme = theme;
  }
}
