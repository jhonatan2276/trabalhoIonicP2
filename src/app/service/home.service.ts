import { Injectable } from '@angular/core';
import { AlertController, proxyInputs } from '@ionic/angular';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private service: GlobalService, private alerta: AlertController) { }

  async recoveryPasswordAlert() {
    const alert = await this.alerta.create({
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
            console.log('Ação Cancelada');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.service.simpleAlert(
              "Recuperação de Senha",
              "Confirmação",
              "Você receberá um email com instruções para Recuperação de Acesso."
            )
          }
        }
      ]
    })
    await alert.present();
  }
}
