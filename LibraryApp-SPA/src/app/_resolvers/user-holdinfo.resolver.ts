import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { UserLoanInfo } from '../_models/userloaninfo';
import { UserHoldInfo } from '../_models/userholdinfo';

@Injectable()
export class UserHoldInfoResolver implements Resolve<UserHoldInfo[]>{
    constructor(private bookService: BookService, private router: Router, 
        private alertify: AlertifyService, private authService: AuthService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<UserHoldInfo[]>{
        return this.bookService.getUserHoldInfo(this.authService.decodedToken.nameid, route.params['bookId']).pipe(
            catchError(error =>{
                this.alertify.error('Problem retrive data');
                this.router.navigate(['/browse']);
                return of(null);

            })
        );
    }
}