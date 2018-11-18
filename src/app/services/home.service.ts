import { Injectable } from '@angular/core';
import { AlertController, proxyInputs } from '@ionic/angular';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //Json data receiver
  users: any;

  constructor(
    private service: GlobalService,
    private alertController: AlertController
  ) { }

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
            this.checkEmail(data.email)
          }
        }
      ]
    })
    await alert.present();
  }

  checkEmail(email) {
    let emailChecked: boolean = false;
    this.service.getServerUsers()
    .subscribe(data => {
      this.users = data;
      
      for (let user of this.users) {
        if (user.email == email) {
          this.service.simpleAlert(
            "Recuperação de Senha",
            "Um email com instruções foi enviando para:",
            email
          )
          emailChecked = true;
          break;
        } else {
          console.log('Email Invalido')
        }
      }

      if (emailChecked == false) {
        this.service.simpleAlert(
          "Recuperação de Senha",
          "Este email é invalido:",
          email
        )
      }
    });
  }
}
