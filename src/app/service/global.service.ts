import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url: string = "http://localhost:3000/users";
  userTheme: string;
  data: any;

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

  getUsers(name, password) {
    return this.http.get(this.url)
    .subscribe(data => {
      this.data = data;

      //alert(this.data[0].nome);

      console.log(this.data)

      for (let user of this.data) {
        //if ((user.name == name) && (user.password == password)) {
        if (user.name == name) {
         // alert("ok");
          this.userTheme = user.theme;
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
}
