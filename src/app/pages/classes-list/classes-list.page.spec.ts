import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesListPage } from './classes-list.page';

describe('ClassesListPage', () => {
  let component: ClassesListPage;
  let fixture: ComponentFixture<ClassesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
