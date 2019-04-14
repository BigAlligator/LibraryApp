import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService, private alertify: AlertifyService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.book = data['book'];
    });
  }

 // loadBook(){
 //   this.bookService.getBook(+this.route.snapshot.params['id']).subscribe((book: Book) => {
 //    this.book = book;
 //   }, error => {
 //     this.alertify.error(error);
 //   })
 // }

}
