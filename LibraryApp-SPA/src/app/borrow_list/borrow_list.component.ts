import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { BookService } from '../_services/book.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-borrow_list',
  templateUrl: './borrow_list.component.html',
  styleUrls: ['./borrow_list.component.css']
})
export class Borrow_listComponent implements OnInit {
  books: Book[];
  book: Book;
  pagination: Pagination;
  borrowParam: string;
  userId: number;
  id: number;

  constructor(private authService: AuthService, private bookService: BookService,
     private route: ActivatedRoute, private alertify: AlertifyService, private router: Router) {
      this.userId = this.authService.decodedToken.nameid;
      this.id = this.userId;
      }

  ngOnInit() {
    
    this.route.data.subscribe(data => {
      this.books = data['books'].result;
      this.pagination = data['books'].pagination;
    });
    this.borrowParam = 'loan';
    console.log(this.userId);
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

  return(id: number){
    this.bookService.returnBook(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have returned successful');
    }, error => {
      this.alertify.error(error);
    });
    location.reload();
  }


}
