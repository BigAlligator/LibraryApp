import { Component, OnInit } from '@angular/core';
import { Author } from '../_models/author';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Author',
  templateUrl: './Author.component.html',
  styleUrls: ['./Author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[];
  bookParams: any = {};
  pagination: Pagination;
  constructor(private bookService: BookService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'].result;
      this.pagination = data['authors'].pagination;
    });
    this.bookParams.authorName = 'ALL';
    this.bookParams.orderBy = 'dateOfBirth';
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    console.log(this.pagination.itemsPerPage);
    this.loadAuthors();
  }

  resetFilters(){
    this.bookParams.authorName = 'ALL';
    this.loadAuthors();
  }

  loadAuthors() {
   this.bookService.getAuthors(this.pagination.currentPage, this.pagination.itemsPerPage, this.bookParams)
    .subscribe((res: PaginatedResult<Author[]>) => {
     this.authors = res.result;
     this.pagination = res.pagination;
   }, error =>{
      this.alertify.error(error);
    });   
  }

}
