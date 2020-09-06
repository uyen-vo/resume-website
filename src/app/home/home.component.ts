import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, style, animate, transition } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('.3s ease-out',
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('.3s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'slowIn',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('2s ease-in',
                    style({ height: 300, opacity: 1 }))
          ]
        )
      ]
    ),
    trigger('blur', [
      transition(':enter', [
        animate('1.5s ease-in-out', keyframes([

          style({
            filter: 'blur(1000px)',
          }),

          style({
            filter: 'blur(0)',
          })
        ]))
      ]),
      transition(':enter', [
        animate('2s ease-out', keyframes([
          style({
            filter: 'blur(0px)',
          }),
          style({
            filter: 'blur(100px)',
        })
      ]))
    ])
  ]),
  ]
})
export class HomeComponent implements OnInit {

  time = new Date();
  currentPage = '';

  constructor(private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        this.currentPage = event.url.substring(1);
      }
    });
  }

  ngOnInit(): void {
    //timer
    setInterval(() => {
      this.time = new Date();
    }, 1000);

  }


}
