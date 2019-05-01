import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Author } from '../_models/author';

@Component({
  selector: 'app-Author-detail',
  templateUrl: './Author-detail.component.html',
  styleUrls: ['./Author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  author: Author;
  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.author = data['author'];
    });
  }

}
