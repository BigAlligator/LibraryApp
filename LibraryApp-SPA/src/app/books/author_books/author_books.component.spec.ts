/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Author_booksComponent } from './author_books.component';

describe('Author_booksComponent', () => {
  let component: Author_booksComponent;
  let fixture: ComponentFixture<Author_booksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Author_booksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Author_booksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
