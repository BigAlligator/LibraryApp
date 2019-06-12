import { Component, OnInit } from '@angular/core';
import { UserLoanInfo } from 'src/app/_models/userloaninfo';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user_loaninfo',
  templateUrl: './user_loaninfo.component.html',
  styleUrls: ['./user_loaninfo.component.css']
})
export class User_loaninfoComponent implements OnInit {

  userloaninf: UserLoanInfo[];
  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userloaninf = data['userloaninfos'];
    });
  }

  extend(loanId: number){
    this.bookService.extendLoanTime(loanId).subscribe(data => {
      this.alertify.success('You have returned successful');
    }, error => {
      this.alertify.error('Failed to extend your loan time either because you have returned the book or you have already extend it one');
    });
    
  }

}
