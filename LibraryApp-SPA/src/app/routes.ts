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
import { Book_contentComponent } from './books/book_content/book_content.component';
import { BookContentResolver } from './_resolvers/book-content.resolver';
import { AuthorComponent } from './Author/Author.component';
import { AuthorListResolver } from './_resolvers/author-list.resolver';
import { AuthorDetailComponent } from './Author-detail/Author-detail.component';
import { AuthorDetailResolver } from './_resolvers/auhtor-detail.resolver';
import { BookLoanInfoComponent } from './books/BookLoanInfo/BookLoanInfo.component';
import { LoanInfoResolver } from './_resolvers/book-loaninfo.resolver';
import { User_loaninfoComponent } from './books/user_loaninfo/user_loaninfo.component';
import { UserLoanInfoResolver } from './_resolvers/user-loaninfo.resolver';
import { Author_booksComponent } from './books/author_books/author_books.component';
import { AuthorBookListResolver } from './_resolvers/author-booklist.resolver';
import { User_holdinfoComponent } from './books/user_holdinfo/user_holdinfo.component';
import { UserHoldInfoResolver } from './_resolvers/user-holdinfo.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'browse', component: Book_listComponent, resolve: {books: BookListResolver}},
            {path: 'browse/book/:id', component: BookDetailComponent, resolve: {book: BookDetailResolver}},
            {path: 'browse/book/content/:bookId', component: Book_contentComponent, resolve: {book: BookContentResolver}},
            {path: 'browse/book/getloannfo/:bookId', component: BookLoanInfoComponent, resolve: {loaninfo: LoanInfoResolver}},
            {path: 'browse/book/getuserlninfo/:bookId', component: User_loaninfoComponent, resolve: {userloaninfos: UserLoanInfoResolver}},
            {path: 'browse/book/userholdinfo/:bookId', component: User_holdinfoComponent, resolve: {userholdinfos: UserHoldInfoResolver}},
            {path: 'browse/book/bookofauthor/:id', component: Author_booksComponent, resolve: {booklists: AuthorBookListResolver}}, 
            {path: 'browse/author', component: AuthorComponent, resolve: {authors: AuthorListResolver}},
            {path: 'browse/author/:id', component: AuthorDetailComponent, resolve: {author: AuthorDetailResolver}},         
            {path: 'my_book', component: Borrow_listComponent, resolve: {books: BorrowListResolver}},
            {path: 'message', component: MessagesComponent},
        ]

    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
