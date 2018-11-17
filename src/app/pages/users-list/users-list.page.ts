import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { DatabaseService } from './../../services/database.service';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  pageTheme: string;
  users: any[] = [];
  selectedUser: any;

  //NgModel Variables
  searchText: string;
  notShowClaerButton: boolean;

  photo: string = '';

  constructor(
    private service: GlobalService,
    private router: Router,
    private db: DatabaseService,
    private dataloading: LoadingController,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.pageTheme = this.service.adminTheme;

    this.getUsers();
  }

  async getUsers() {
    const loading = await this.dataloading.create({
      message: 'Carregando Dados...',
      spinner: 'circles',
      animated: true
    });

    await loading.present();
    
    this.db.getUsers()
    .then((result: any[]) => {
      this.users = result;
    });

    loading.dismiss();
    this.notShowClaerButton = true;
    this.searchText = null;
  }

  doRefresh(event) {
    this.getUsers();
    
    event.target.complete();
  }

  searchUser() {
    this.db.searchUsers(this.searchText)
    .then((result: any[]) => {
      this.users = result;
    });
    this.notShowClaerButton = false;
  }

  usersDetail(userId) {
    this.service.userId = userId;
    this.router.navigate(['/user-detail']);
  }


  /*this.db.getUserById(this.userId)
    .then((result: any[]) => {
      this.selectedUser = result;


  this.service.catchUserDataEdit(
    this.selectedUser[0].id,
    this.selectedUser[0].id_server,
    this.selectedUser[0].name,
    this.selectedUser[0].email,
    this.selectedUser[0].dateBirth,
    this.selectedUser[0].curriculum,
    this.selectedUser[0].status,
    this.selectedUser[0].theme
  )
  this.service.actionType = 2;
  this.router.navigate(['/user-edit']);
}*/

  editUser(userId) {
    /*this.service.getUserDetail(userId)
    .subscribe(data => {this.selectedUser = data*/
    
    this.db.getUserById(userId)
    .then((result: any[]) => {this.selectedUser = result;

    this.service.catchUserDataEdit(
      this.selectedUser[0].id,
      this.selectedUser[0].id_server,
      this.selectedUser[0].name,
      this.selectedUser[0].email,
      this.selectedUser[0].dateBirth,
      this.selectedUser[0].curriculum,
      this.selectedUser[0].status,
      this.selectedUser[0].theme
    )
    this.service.actionType = 2;
    this.router.navigate(['/user-edit']);
  })




    /*this.service.actionType = 2;
    this.service.catchUserDataEdit(
      this.selectedUser.id,
      this.selectedUser.name,
      this.selectedUser.email,
      this.selectedUser.dateBirth,
      this.selectedUser.curriculum,
      this.selectedUser.status,
      this.selectedUser.theme
    )
    this.router.navigate(['/user-edit']);
    });*/
  }

  deleteUser(id) {
    this.service.deleteUser(id);
  }


  takePicture() {
    this.photo = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.photo = base64Image;
    }, (err) => {
     // Handle error
    });
  }
}
