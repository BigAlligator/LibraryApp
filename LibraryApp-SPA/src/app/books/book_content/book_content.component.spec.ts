/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Book_contentComponent } from './book_content.component';

describe('Book_contentComponent', () => {
  let component: Book_contentComponent;
  let fixture: ComponentFixture<Book_contentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Book_contentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Book_contentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
