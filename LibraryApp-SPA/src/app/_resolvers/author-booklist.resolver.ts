import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { UserLoanInfo } from '../_models/userloaninfo';
import { BookOfAuthor } from '../_models/bookofauthor';

@Injectable()
export class AuthorBookListResolver implements Resolve<BookOfAuthor[]>{
    constructor(private bookService: BookService, private router: Router, 
        private alertify: AlertifyService, private authService: AuthService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<BookOfAuthor[]>{
        return this.bookService.getAuthorBookList(route.params['id']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrive data');
                this.router.navigate(['/browse']);
                return of(null);

            })
        );
    }
}