import { Injectable } from '@angular/core';
import { AlertController, proxyInputs } from '@ionic/angular';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //Json data receiver
  data: any;

  emailCheck: boolean;

  constructor(
    private service: GlobalService,
    private alertController: AlertController
  ) { }

  emailValidation(email) {
    return this.service.getUsers()
    .subscribe(data => {this.data = data;

      for (let user of this.data) {
        if (user.email == email) {
          this.emailCheck = true;
        } else {
          this.emailCheck = false;
        } 
      }
    })
  }

  async recoveryPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Informe seu E-mail:',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Informe seu E-mail:'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Canceled');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.service.simpleAlert(
              "Recuperação de Senha",
              "Um email com instruções foi enviando para:",
              data.email
            )
          }
        }
      ]
    })
    await alert.present();
  }
}
