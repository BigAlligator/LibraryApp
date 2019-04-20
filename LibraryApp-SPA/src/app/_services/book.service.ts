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

getBooks(page?, itemPerPage?): Observable<PaginatedResult<Book[]>>{
  const paginatedResult : PaginatedResult<Book[]> = new PaginatedResult<Book[]>();
  let params = new HttpParams();

  if(page != null && itemPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemPerPage);
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

}
