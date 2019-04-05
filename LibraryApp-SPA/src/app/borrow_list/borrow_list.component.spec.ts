/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Borrow_listComponent } from './borrow_list.component';

describe('Borrow_listComponent', () => {
  let component: Borrow_listComponent;
  let fixture: ComponentFixture<Borrow_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Borrow_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Borrow_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
