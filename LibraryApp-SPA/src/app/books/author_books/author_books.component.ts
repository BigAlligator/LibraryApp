import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { BookOfAuthor } from 'src/app/_models/bookofauthor';

@Component({
  selector: 'app-author_books',
  templateUrl: './author_books.component.html',
  styleUrls: ['./author_books.component.css']
})
export class Author_booksComponent implements OnInit {

  booklist: BookOfAuthor[];
  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.booklist = data['booklists'];
    });

  }

}
