/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_holdinfoComponent } from './user_holdinfo.component';

describe('User_holdinfoComponent', () => {
  let component: User_holdinfoComponent;
  let fixture: ComponentFixture<User_holdinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_holdinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_holdinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
