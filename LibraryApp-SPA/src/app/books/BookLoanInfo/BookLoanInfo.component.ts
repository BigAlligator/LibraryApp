import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LoanInfo } from 'src/app/_models/loaninfo';

@Component({
  selector: 'app-BookLoanInfo',
  templateUrl: './BookLoanInfo.component.html',
  styleUrls: ['./BookLoanInfo.component.css']
})
export class BookLoanInfoComponent implements OnInit {
  loaninfo : LoanInfo[];
  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.loaninfo = data['loaninfo'];
    });
  }

  

}
