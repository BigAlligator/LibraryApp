/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_loaninfoComponent } from './user_loaninfo.component';

describe('User_loaninfoComponent', () => {
  let component: User_loaninfoComponent;
  let fixture: ComponentFixture<User_loaninfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_loaninfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_loaninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
