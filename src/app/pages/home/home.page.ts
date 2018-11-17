import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { DatabaseService } from './../../services/database.service';
import { LoadingController } from '@ionic/angular';


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //NgModel variables
  userName: string = "admin1";
  userPassword: string = "admin";

  //Json data receiver
  data: any;
  users: any;

  logginSucess: boolean;

  photo: string = '';
 


  constructor (
    private service: GlobalService,
    private homeService: HomeService,
    private router: Router,
    private db: DatabaseService,
    private dataloading: LoadingController,

    private camera: Camera
  ) {}

  login() {
    this.service.getAdmins()
    .subscribe(data => {
      this.data = data;

      for (let admin of this.data) {
        if ((admin.login == this.userName) && (admin.password == this.userPassword)) {
          this.service.adminTheme = admin.theme;
          this.service.authenticatedUser = true;
          this.logginSucess = true;
          this.loadUsersServer();
          break;
        } else {
          this.logginSucess = false;
        }
      }

      if (!this.logginSucess) {
        this.service.simpleAlert(
          "Usuário ou Senha Incorretos",
          "Falha de Login",
          "Tente Novamente"
        )
      }
    });
  }

  async loadUsersServer() {
    const loading = await this.dataloading.create({
      message: 'Baixando Dados...',
      spinner: 'circles',
      animated: true
    });

    await loading.present();
    
    this.service.getUsers()
    .subscribe(data => {this.users = data;

      for (let i = 0; i < this.users.length; i++) {
        this.db.insertUser(
          this.users[i].id,
          this.users[i].name,
          this.users[i].email,
          this.users[i].dateBirth,
          this.users[i].photo,
          this.users[i].curriculum,
          this.users[i].status,
          this.users[i].theme
        )
      }
    });

    loading.dismiss();
    this.router.navigate(['/users-list']);
  }

  recoveryPassword() {
    this.homeService.recoveryPasswordAlert();
  }

  validateFields() {
    if (
      !this.userName ||
      !this.userPassword
    ) {
      return false
    } else {
      return true;
    }
  }






  takePicture() {
    this.photo = '';
 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
 
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }


}
