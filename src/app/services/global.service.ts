import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  urlUsers: string = "http://localhost:3000/users";
  urlClasses: string = "http://localhost:3000/classes";
  userId: string;
  userName: string
  userTheme: string;
  userType: number;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toast: ToastController,
  ) { }

  async simpleAlert(title, subtitle, text) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  catchUserData(name, theme) {
    this.userName = name;
    this.userTheme = theme;
  }

  getUsers() {
    return this.http.get(this.urlUsers)
  }

  getUserDetail(id) {
    return this.http.get(`${this.urlUsers}/${id}`)
  }

  getClasses() {
    return this.http.get(this.urlClasses)
  }

  async deleteUser(id) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja Apagar esse Registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Canceled');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.http.delete(`${this.urlUsers}/${id}`).subscribe((response) => {console.log("Deleted")});
            this.simpleToastAlert("Registro Apgado", 2000, 'bottom')
            console.log('Done');
          }
        }
      ]
    });
    await alert.present();
  }

  async simpleToastAlert(text, duration, position) {
    const toast = await this.toast.create({
      message: text,
      duration: duration,
      position: position
    });
    toast.present();
  }
}
