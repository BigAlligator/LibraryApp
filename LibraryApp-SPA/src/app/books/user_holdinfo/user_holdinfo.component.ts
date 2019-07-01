import { Component, OnInit } from '@angular/core';
import { UserHoldInfo } from 'src/app/_models/userholdinfo';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user_holdinfo',
  templateUrl: './user_holdinfo.component.html',
  styleUrls: ['./user_holdinfo.component.css']
})
export class User_holdinfoComponent implements OnInit {
  userholdinfos: UserHoldInfo[];
  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userholdinfos = data['userholdinfos'];
    });
  }

}
