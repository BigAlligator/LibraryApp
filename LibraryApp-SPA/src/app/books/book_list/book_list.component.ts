import { Component, OnInit } from '@angular/core';
import { Book } from '../../_models/book';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-book_list',
  templateUrl: './book_list.component.html',
  styleUrls: ['./book_list.component.css']
})
export class Book_listComponent implements OnInit {
  books: Book[];
  constructor(private bookService: BookService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      console.log(this.books);
    }, error =>{
      this.alertify.error(error);
    });   
  }

}
