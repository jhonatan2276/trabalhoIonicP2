import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  //JSON Server IP
  ip: string = "192.168.0.101"; //Don't use LOCALHOST (Word), use NUMBER

  urlAdmins: string = "http://"+this.ip+":3000/admins";
  urlUsers: string = "http://"+this.ip+":3000/users";
  urlClasses: string = "http://"+this.ip+":3000/classes";
  userId: string;
  adminTheme: string;
  
  editUserId: number;
  editUserIdServer: number
  editUserName: string;
  editUserEmail: string;
  edirUserDateBirth: any;
  editUserCurriculum: string;
  editUserStatus: string;
  editUserTheme: string;

  serveResponse: any;

  //IF 1 - POST / IF 2 - PUT
  actionType: number;

  //Auth Control
  authenticatedUser: boolean = false;

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toast: ToastController,
    private router: Router,
    private db: DatabaseService
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

  catchUserData(theme) {
    this.adminTheme = theme;
  }

  catchUserDataEdit(id, idServer, name, email, dateBirth, curriculum, status, theme) {
    this.editUserId = id;
    this.editUserIdServer = idServer;
    this.editUserName = name;
    this.editUserEmail = email;
    this.edirUserDateBirth = dateBirth;
    this.editUserCurriculum = curriculum;
    this.editUserStatus = status;
    this.editUserTheme = theme;
  }

  getAdmins() {
    return this.http.get(this.urlAdmins)
  }

  getUsers() {
    return this.http.get(this.urlUsers)
  }

  /*getUserDetail(id) {
    return this.http.get(`${this.urlUsers}/${id}`)
  }*/

  /*putUser(id, name, email, dateBirth, curriculum, status, theme) {
    this.http.put(`${this.urlUsers}/${id}`, {
      name: name,
      email: email,
      dateBirth: dateBirth,
      photo: "../../assets/default-user-photo/default-user.png",
      curriculum: curriculum,
      status: status,
      theme: theme
    })
    .subscribe(data => {
      this.serveResponse = data,
      this.router.navigate(['/users-list']),
      this.toastAlert("Registro Salvo", 2000, "bottom");
    });
  }*/

  /*postUser(name, email, dateBirth, curriculum, status, theme) {
    this.http.post(this.urlUsers, {
      name: name,
      email: email,
      dateBirth: dateBirth,
      photo: "../../assets/default-user-photo/default-user.png",
      curriculum: curriculum,
      status: status,
      theme: theme
    }).subscribe(data => {
      this.serveResponse = data,
      this.router.navigate(['/users-list']),
      this.toastAlert("Registro Salvo", 2000, "bottom");
    });
  }*/

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
            this.db.deleteUser(id)
            .then(() => {
              this.router.navigate(['/users-list']);
              this.toastAlert("Registro Apagado", 2000, "bottom")
            });



            /*this.http.delete(`${this.urlUsers}/${id}`)
            .subscribe((response) => {console.log("Deleted")});
            this.toastAlert("Registro Apgado", 2000, 'bottom')
            this.router.navigate(['/users-list']);
            console.log('Done');*/
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
