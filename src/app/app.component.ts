import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uyen-codes-website';

  ngOnInit() {
    //disable iOS bouncing?
    // document.body.addEventListener('touchmove', function(e) {
    //   e.preventDefault();
    // }, { passive: false });
  }
}
