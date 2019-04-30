import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../_models/author';

@Component({
  selector: 'app-Author-card',
  templateUrl: './Author-card.component.html',
  styleUrls: ['./Author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: Author;
  constructor() { }

  ngOnInit() {
  }

}
