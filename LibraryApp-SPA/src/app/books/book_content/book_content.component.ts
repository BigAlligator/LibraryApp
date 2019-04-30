import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { BookService } from 'src/app/_services/book.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/book';
declare const turnRight, turnLeft: any;
@Component({
  selector: 'app-book_content',
  templateUrl: './book_content.component.html',
  styleUrls: ['./book_content.component.css']
})

export class Book_contentComponent implements OnInit {
  @Input() book: Book;
  content: string[];
  constructor(private authService: AuthService, private bookService: BookService,
     private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadContent();
    
  }

  // getContent(id: number)
  // {
  //   this.bookService.borrowBook(this.authService.decodedToken.nameid, id).subscribe(data => {
  //     this.alertify.success('Retrived book content successful');
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

 loadContent(){
  this.bookService.contentBook(this.authService.decodedToken.nameid, +this.route.snapshot.params['bookId']).subscribe((data) => {
    this.content = data;
    console.log(data);
  }, error => {
     this.alertify.error(error);
   })
   
 }

 onClickRight() {
  turnRight();
}
onClickLeft() {
  turnLeft();
}


}
