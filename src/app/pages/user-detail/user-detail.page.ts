import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: string;
  selectedUser: any;

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.userId = this.service.userId;

    this.service.getUserDetail(this.userId)
    .subscribe(data => {this.selectedUser = data});
  }
}
