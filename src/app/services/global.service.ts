import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  urlUsers: string = "http://192.168.0.101:3000/users";
  urlClasses: string = "http://192.168.0.101:3000/classes";
  userId: string;
  userName: string;
  userTheme: string;
  
  editUserId: string;
  editUserName: string;
  editUserEmail: string;
  edirUserDateBirth: string;
  editUserCurriculum: string;
  editUserStatus: string;
  editUserTheme: string;

  serveResponse: any;

  //if 1 - POST / IF 2 - PUT
  actionType: number;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toast: ToastController,
    private router: Router
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

  async toastAlert(text, duration, position) {
    const toast = await this.toast.create({
      message: text,
      duration: duration,
      position: position
    });
    toast.present();
  }

  catchUserData(name, theme) {
    this.userName = name;
    this.userTheme = theme;
  }

  catchUserDataEdit(id, name, email, dateBirth, curriculum, status, theme) {
    this.editUserId = id;
    this.editUserName = name;
    this.editUserEmail = email;
    this.edirUserDateBirth = dateBirth;
    this.editUserCurriculum = curriculum;
    this.editUserStatus = status;
    this.editUserTheme = theme;
  }

  getUsers() {
    return this.http.get(this.urlUsers)
  }

  getUserDetail(id) {
    return this.http.get(`${this.urlUsers}/${id}`)
  }

  putUser(id, name, email, dateBirth, curriculum, status, theme) {
    this.http.put(`${this.urlUsers}/${id}`, {
      name: name,
      email: email,
      dateBirth: dateBirth,
      photo: "../../assets/default-user-photo/default-user.png",
      curriculum: curriculum,
      status: status,
      theme: theme
    })
    .subscribe(data => {this.serveResponse = data});
  }

  postUser(name, email, dateBirth, curriculum, status, theme) {
    this.http.post(this.urlUsers, {
      name: name,
      email: email,
      dateBirth: dateBirth,
      photo: "../../assets/default-user-photo/default-user.png",
      curriculum: curriculum,
      status: status,
      theme: theme
    })
    .subscribe(data => {this.serveResponse = data});
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
            this.http.delete(`${this.urlUsers}/${id}`)
            .subscribe((response) => {console.log("Deleted")});
            this.toastAlert("Registro Apgado", 2000, 'bottom')
            this.router.navigate(['/users-list']);
            console.log('Done');
          }
        }
      ]
    });
    await alert.present();
  }

  getClasses() {
    return this.http.get(this.urlClasses)
  }
}
