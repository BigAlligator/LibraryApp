import { Component, OnInit } from '@angular/core';
import { Book } from '../../_models/book';
import { BookService } from '../../_services/book.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';



@Component({
  selector: 'app-book_list',
  templateUrl: './book_list.component.html',
  styleUrls: ['./book_list.component.css']
})
export class Book_listComponent implements OnInit {
  books: Book[];
  pagination: Pagination;
  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.books = data['books'].result;
      this.pagination = data['books'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    console.log(this.pagination.itemsPerPage);
    this.loadBooks();
  }

  loadBooks() {
   this.bookService.getBooks(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Book[]>) => {
     this.books = res.result;
     this.pagination = res.pagination;
   }, error =>{
      this.alertify.error(error);
    });   
  }

}
