import {Injectable} from '@angular/core';
import {Book} from '../_models/book';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class BookContentResolver implements Resolve<any>{
    constructor(private bookService: BookService, private router: Router, 
        private alertify: AlertifyService, private authService: AuthService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<any>{
        return this.bookService.contentBook(this.authService.decodedToken.nameid, route.params['bookId']).pipe(
            catchError(error =>{
                this.alertify.error('Problem ');
                this.router.navigate(['/browse']);
                return of(null);

            })
        );
    }
}