import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.page.html',
  styleUrls: ['./classes-list.page.scss'],
})
export class ClassesListPage implements OnInit {

  classes: any;

  constructor(
    private service: GlobalService
  ) { }

  ngOnInit() {
    this.service.getClasses()
    .subscribe(data => {this.classes = data});
  }
}
