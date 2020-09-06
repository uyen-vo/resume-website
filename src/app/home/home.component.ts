import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  time = new Date();
  currentPage: string;

  constructor() {
  }

  ngOnInit() {
      setInterval(() => {
        this.time = new Date();
      }, 1000);
  }

  
}
