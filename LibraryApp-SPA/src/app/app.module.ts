import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { Book_listComponent } from './books/book_list/book_list.component';
import { Borrow_listComponent } from './borrow_list/borrow_list.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { BookService } from './_services/book.service';
import { BookCardComponent } from './books/book-card/book-card.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookDetailResolver } from './_resolvers/book-detail.resolver';
import { BookListResolver } from './_resolvers/book-list.resolver';
import { BorrowListResolver } from './_resolvers/borrow-list.resolver';
import { Book_contentComponent } from './books/book_content/book_content.component';
import { BookContentResolver } from './_resolvers/book-content.resolver';
import { AuthorComponent } from './Author/Author.component';
import { AuthorListResolver } from './_resolvers/author-list.resolver';
import { AuthorCardComponent } from './Author-card/Author-card.component';
import { AuthorDetailComponent } from './Author-detail/Author-detail.component';
import { AuthorDetailResolver } from './_resolvers/auhtor-detail.resolver';
import { BookLoanInfoComponent } from './books/BookLoanInfo/BookLoanInfo.component';
import { LoanInfoResolver } from './_resolvers/book-loaninfo.resolver';



export function tokenGetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      Book_listComponent,
      Borrow_listComponent,
      MessagesComponent,
      BookCardComponent,
      BookDetailComponent,
      Book_contentComponent,
      AuthorComponent,
      AuthorCardComponent,
      AuthorCardComponent,
      AuthorDetailComponent,
      BookLoanInfoComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TabsModule.forRoot(), 
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      BookService,
      BookDetailResolver,
      BookListResolver,
      BorrowListResolver,
      BookContentResolver,
      AuthorListResolver,
      AuthorDetailResolver,
      LoanInfoResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }