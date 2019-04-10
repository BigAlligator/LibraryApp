import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Book_listComponent } from './books/book_list/book_list.component';
import { Borrow_listComponent } from './borrow_list/borrow_list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'browse', component: Book_listComponent},
            {path: 'my_book', component: Borrow_listComponent},
            {path: 'message', component: MessagesComponent},
        ]

    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
