import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Author } from '../_models/author';
import { LoanInfo } from '../_models/loaninfo';
import { UserLoanInfo } from '../_models/userloaninfo';
import { BookOfAuthor } from '../_models/bookofauthor';



@Injectable({
  providedIn: 'root'
})
export class BookService {

baseUrl = environment.apiurl;

constructor(private http: HttpClient) { }

getBooks(page?, itemPerPage?, bookParams?, borrowParams?): Observable<PaginatedResult<Book[]>>{
  const paginatedResult : PaginatedResult<Book[]> = new PaginatedResult<Book[]>();
  let params = new HttpParams();

  if(page != null && itemPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemPerPage);
  }

  if(bookParams != null){
    params = params.append('mainGenre', bookParams.mainGenre);
    params = params.append('bookName', bookParams.bookName);
    params = params.append('orderBy', bookParams.orderBy);
  }

  if(borrowParams === 'loan')
  {
    params = params.append('loanbook', 'true');
  }

  return this.http.get<Book[]>(this.baseUrl + 'book', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if(response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
      }
      return paginatedResult;
    })
  );
}

getAuthors(page?, itemPerPage?, bookParams?): Observable<PaginatedResult<Author[]>>{
  const paginatedResult : PaginatedResult<Author[]> = new PaginatedResult<Author[]>();
  let params = new HttpParams();

  if(page != null && itemPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemPerPage);
  }

  if(bookParams != null){
    params = params.append('authorName', bookParams.authorName);
    params = params.append('orderBy', bookParams.orderBy);
  }

  return this.http.get<Author[]>(this.baseUrl + 'book/author', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if(response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
      }
      return paginatedResult;
    })
  );
}

getBook(id): Observable<Book>{
  return this.http.get<Book>(this.baseUrl + 'book/' + id);
}

getAuthor(id): Observable<Author>{
  return this.http.get<Author>(this.baseUrl + 'book/author/' + id);
}

getAuthorBookList(id: number): Observable<any> {
  return this.http.get<UserLoanInfo[]>(this.baseUrl + 'book/authorbooklist/' + id);
}

borrowBook(id: number, bookId: number){
  return this.http.post(this.baseUrl + 'book/'+ id + '/borrow/' + bookId, {});
}

returnBook(id: number, bookId: number){
  return this.http.put(this.baseUrl + 'book/'+ id + '/return/' + bookId, {} );
}

extendLoanTime(loanId: number){
  return this.http.put(this.baseUrl + 'book/extend/' + loanId, {} );
}

contentBook(id: number, bookId: number): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'book/' + id + '/content/' + bookId);
}

getLoanInfo(id: number, bookId: number): Observable<any> {
  return this.http.get<LoanInfo[]>(this.baseUrl + 'book/' + id + '/getloaninfo/' + bookId);
}

getUserLoanInfo(id: number, bookId: number): Observable<any> {
  return this.http.get<UserLoanInfo[]>(this.baseUrl + 'book/' + id + '/getuserloaninfo/' + 1);
}

}
