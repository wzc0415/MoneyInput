import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = '';

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.title = '1231';
    }, 2000);
  }

  ngDoCheck() {
    console.log(this.title);
  }
}
