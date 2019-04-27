import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { BookService } from '../_services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-borrow_list',
  templateUrl: './borrow_list.component.html',
  styleUrls: ['./borrow_list.component.css']
})
export class Borrow_listComponent implements OnInit {
  books: Book[];
  pagination: Pagination;
  borrowParam: string;

  constructor(private authService: AuthService, private bookService: BookService,
     private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.books = data['books'].result;
      this.pagination = data['books'].pagination;
    });
    this.borrowParam = 'loan';
  }

  loadBooks() {
    this.bookService.getBooks(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.borrowParam)
     .subscribe((res: PaginatedResult<Book[]>) => {
      this.books = res.result;
      this.pagination = res.pagination;
    }, error =>{
       this.alertify.error(error);
     });   
   }

   pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    console.log(this.pagination.itemsPerPage);
    this.loadBooks();
  }

}
