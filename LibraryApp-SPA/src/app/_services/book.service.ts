import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../_models/book';



@Injectable({
  providedIn: 'root'
})
export class BookService {

baseUrl = environment.apiurl;

constructor(private http: HttpClient) { }

getBooks(): Observable<Book[]>{
  return this.http.get<Book[]>(this.baseUrl + 'book');
}

getBook(id): Observable<Book>{
  return this.http.get<Book>(this.baseUrl + 'book/' + id);
}

}
