import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';



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

getBook(id): Observable<Book>{
  return this.http.get<Book>(this.baseUrl + 'book/' + id);
}

borrowBook(id: number, bookId: number){
  return this.http.post(this.baseUrl + 'book/'+ id + '/borrow/' + bookId, {});
}

returnBook(id: number, bookId: number){
  return this.http.put(this.baseUrl + 'book/'+ id + '/return/' + bookId, {} );
}

contentBook(id: number, bookId: number): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'book/' + id + '/content/' + bookId);
}

}
