import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../../services/database.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

  //NgModel variables
  id: number;
  userIdServer: number;
  userName: string;
  userEmail: string;
  userDateBirth: any;
  userPhoto: string;
  userCurriculum: string;
  userStatus: string;
  userTheme: string;

  //Default User Photo
  defaultUserPhoto: string = '../../assets/default-user-photo/default-user.png';

  //TESTE
  dateText: any;
  dateDb: any;

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService,
    private camera: Camera,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.id = this.service.editUserId;
    this.userIdServer = this.service.editUserIdServer;
    this.userName = this.service.editUserName;
    this.userEmail = this.service.editUserEmail;
    this.userDateBirth = this.service.edirUserDateBirth;
    /*if (this.service.actionType == 1) {
      this.userDateBirth = null;
    } else {
      //Converts a Date to String and this String to ISO 8601 (to DateTime)
      this.dateText = moment(this.userDateBirth);   
      this.userDateBirth = moment(this.dateText.format(), moment.ISO_8601).format();    
    }*/
    if (this.service.actionType == 1) {
      this.userPhoto = this.defaultUserPhoto;
    } else {
      this.userPhoto = this.service.editUserPhoto;   
    }
    this.userCurriculum = this.service.editUserCurriculum;
    this.userStatus = this.service.editUserStatus;
    this.userTheme = this.service.editUserTheme;
  }

  async takePicture() {
    const alert = await this.alertController.create({
      header: 'Upload de Arquivo',
      message: 'De onde deseja carregar a foto?',
      buttons: [
        {
          text: 'Galeria',
          cssClass: 'secondary',
          handler: (blah) => {
            const optionsGallery: CameraOptions = {
              quality: 50,
              destinationType: this.camera.DestinationType.DATA_URL,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              saveToPhotoAlbum: false
            }
         
            this.camera.getPicture(optionsGallery)
              .then((imageData) => {
                let base64image = 'data:image/jpeg;base64,' + imageData;
                this.userPhoto = base64image;
              }, (error) => {
                console.error(error);
              })
              .catch((error) => {
                console.error(error);
              })
          }
        }, {
          text: 'Tirar uma Foto',
          handler: () => {
            const optionsCamera: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              allowEdit: false,
              targetWidth: 100,
              targetHeight: 100
            }
         
            this.camera.getPicture(optionsCamera)
              .then((imageData) => {
                let base64image = 'data:image/jpeg;base64,' + imageData;
                console.log(base64image);
                this.userPhoto = base64image;
              }, (error) => {
                console.error(error);
              })
              .catch((error) => {
                console.error(error);
              })
          }
        }
      ]
    });
    await alert.present();
  }

  save() {
    //IF NEW USER
    if (this.service.actionType == 1) {
      this.db.insertUser(
        null,
        this.userName,
        this.userEmail,
        //this.userDateBirth = this.dateToText(this.userDateBirth),
        this.userDateBirth,
        this.userPhoto,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
      .then(() => {
        this.router.navigate(['/users-list']);
        this.service.toastAlert("Salvo com Sucesso", 2000, "bottom");
        this.db.insertTaskSync(
          "POST",
          null,
          this.userName,
          this.userEmail,
          //this.userDateBirth = this.dateToText(this.userDateBirth),
          this.userDateBirth,
          this.userPhoto,
          this.userCurriculum,
          this.userStatus,
          this.userTheme
        );
      })
      .catch(() => this.service.simpleAlert("Erro", "Erro ao Salvar", "Falha ao Salvar Usuário"))
    } else {
      //IF EDIT USER
      this.db.updateUser(
        this.id,
        this.userIdServer,
        this.userName,
        this.userEmail,
        //this.userDateBirth = this.dateToText(this.userDateBirth),
        //this.userDateBirth = "2018-01-25",
        this.userDateBirth,
        this.userPhoto,
        this.userCurriculum,
        this.userStatus,
        this.userTheme
      )
      .then(() => {
        this.router.navigate(['/users-list']);
        this.service.toastAlert("Alterado com Sucesso", 2000, "bottom");
        this.db.insertTaskSync(
          "PUT",
          this.userIdServer,
          this.userName,
          this.userEmail,
          //this.userDateBirth = this.dateToText(this.userDateBirth),
          this.userDateBirth,
          this.userPhoto,
          this.userCurriculum,
          this.userStatus,
          this.userTheme
        )
      })
      .catch(() => this.service.simpleAlert("Erro", "Erro ao Salvar", "Falha ao Salvar Usuário"))
    }
    this.clearVariables();
  }
  
  cancel() {
    this.clearVariables();
    this.router.navigate(['/users-list']);
    this.service.toastAlert("Cancelado pelo Usuário", 2000, 'bottom')
  }

  dateToText(date) {
    this.dateDb = this.userDateBirth.year.text+'-'+this.userDateBirth.month.text+'-'+this.userDateBirth.day.text;
    alert(this.dateDb);
  }

  clearVariables() {
    this.service.editUserId = null;
    this.service.editUserName = null;
    this.service.editUserEmail = null;
    this.service.edirUserDateBirth = null;
    this.service.editUserPhoto = null;
    this.service.editUserCurriculum = null;
    this.service.editUserStatus = null;
    this.service.editUserTheme = null;
  }

  validateFields() {
    if (
      !this.userName ||
      !this.userEmail ||
      !this.userDateBirth ||
      !this.userCurriculum ||
      !this.userStatus ||
      !this.userTheme
    ) {
      return false
    } else {
      return true;
    }
  }
}
