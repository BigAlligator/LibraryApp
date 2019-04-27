import {Injectable} from '@angular/core';
import {Book} from '../_models/book';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BorrowListResolver implements Resolve<Book[]>{
    pageNumber = 1;
    pageSize = 12;
    borrowParams = 'loan';

    constructor(private bookService: BookService, private router: Router, private alertify: AlertifyService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<Book[]>{
        return this.bookService.getBooks(this.pageNumber, this.pageSize, null, this.borrowParams).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);

            })
        );
    }
}