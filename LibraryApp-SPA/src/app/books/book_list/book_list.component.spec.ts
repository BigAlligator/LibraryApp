/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Book_listComponent } from './book_list.component';

describe('Book_listComponent', () => {
  let component: Book_listComponent;
  let fixture: ComponentFixture<Book_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Book_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Book_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
