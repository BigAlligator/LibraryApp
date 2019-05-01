import {Injectable} from '@angular/core';
import {Book} from '../_models/book';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../_models/author';

@Injectable()
export class AuthorDetailResolver implements Resolve<Author>{
    constructor(private bookService: BookService, private router: Router, private alertify: AlertifyService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<Author>{
        return this.bookService.getAuthor(route.params['id']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/browse']);
                return of(null);

            })
        );
    }
}