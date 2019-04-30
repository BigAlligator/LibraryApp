import {Injectable} from '@angular/core';
import {Book} from '../_models/book';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../_models/author';

@Injectable()
export class AuthorListResolver implements Resolve<Author[]>{
    pageNumber = 1;
    pageSize = 12;

    constructor(private bookService: BookService, private router: Router, private alertify: AlertifyService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<Author[]>{
        return this.bookService.getAuthors(this.pageNumber, this.pageSize).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);

            })
        );
    }
}