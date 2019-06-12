import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { UserLoanInfo } from '../_models/userloaninfo';

@Injectable()
export class UserLoanInfoResolver implements Resolve<UserLoanInfo[]>{
    constructor(private bookService: BookService, private router: Router, 
        private alertify: AlertifyService, private authService: AuthService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<UserLoanInfo[]>{
        return this.bookService.getUserLoanInfo(this.authService.decodedToken.nameid, route.params['bookId']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrive data');
                this.router.navigate(['/browse']);
                return of(null);

            })
        );
    }
}