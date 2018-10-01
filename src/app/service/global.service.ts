import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient, private alerta: AlertController) { }

  async simpleAlert(title, subtitle, text) {
    const alert = await this.alerta.create({
      header: title,
      subHeader: subtitle,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
