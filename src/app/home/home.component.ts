import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, keyframes, style, animate, transition, query } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';


import { disableBodyScroll } from 'body-scroll-lock';
import type { BodyScrollOptions } from 'body-scroll-lock';

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
            style({ opacity: 0 }),
            animate('.7s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('.3s ease-out',
              style({ opacity: 0 }))
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
    trigger('routerFade', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 })],
          { optional: true }
        ),
        query(
          ':leave',
          [style({ opacity: 1 }), animate('1s', style({ opacity: 0 }))],
          { optional: true }
        ),
        query(
          ':enter',
          [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))],
          { optional: true }
        )
      ])
    ]),
  ],
})
export class HomeComponent implements OnInit {

  @ViewChild('crePfpRef') crePfpElem: ElementRef;
  @ViewChild('devPfpRef') devPfpElem: ElementRef;
  @ViewChild('quoteRef') quoteElem: ElementRef;

  date = new Date();
  currentPage = '';
  quote = "";
  quotes = [
    "memento mori",
    "I felt the unconventional.",
    "Anguish shapes integrity.",
    "I love myself, always.",
    "perfect timing",
    "Today is the first day of the rest of your life.",
    "Reconsider your self-set limitations.",
    "Slow motion better than no motion.",
    "Every passing moment is a chance to turn it all around.",
    "&#9698;&#9700;"
  ];

  constructor(private router: Router) {
    this.currentPage = this.router.url.substring(1);

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPage = event.url.substring(1);
        this.togglePfp();
        console.log(this.currentPage);
      }
    });

  }

  ngOnInit(): void {
    //timer
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.togglePfp();

    const options: BodyScrollOptions = {
      reserveScrollBarGap: true,
    };

    disableBodyScroll(document.getElementsByClassName('router-container')[0], options);

    setTimeout(() => {
      this.getQuote();
    }, 200);

  }

  togglePfp(): void {
    if (this.currentPage !== '') {
      setTimeout(() => {
        const creElem: HTMLElement = this.crePfpElem.nativeElement;
        const devElem: HTMLElement = this.devPfpElem.nativeElement;

        creElem.classList.remove("opaque");
        devElem.classList.remove("opaque");

        if (this.currentPage === "creative") {
          creElem.classList.add("opaque");
        } else if (this.currentPage === "developer") {
          devElem.classList.add("opaque");
        }
      });
    }
  }

  getQuote(): void {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

    if (this.quote === '&#9698;&#9700;') {
      const quoElem: HTMLElement = this.quoteElem.nativeElement;
      quoElem.style.fontSize = "35px"
      quoElem.innerHTML = this.quote;
      this.quote = '';
    }
  }
}
