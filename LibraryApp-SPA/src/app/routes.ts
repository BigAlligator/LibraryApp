import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Book_listComponent } from './books/book_list/book_list.component';
import { Borrow_listComponent } from './borrow_list/borrow_list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookDetailResolver } from './_resolvers/book-detail.resolver';
import { BookListResolver } from './_resolvers/book-list.resolver';
import { BorrowListResolver } from './_resolvers/borrow-list.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'browse', component: Book_listComponent, resolve: {books: BookListResolver}},
            {path: 'browse/book/:id', component: BookDetailComponent, resolve: {book: BookDetailResolver}},           
            {path: 'my_book', component: Borrow_listComponent, resolve: {books: BorrowListResolver}},
            {path: 'message', component: MessagesComponent},
        ]

    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
