import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, keyframes, style, animate, transition, query } from '@angular/animations';
import { Router, NavigationStart } from '@angular/router';
import { ResizedEvent } from 'angular-resize-event';


// import { disableBodyScroll } from 'body-scroll-lock';
// import type { BodyScrollOptions } from 'body-scroll-lock';

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

  @ViewChild('quoteRef') quoteElem: ElementRef;

  bgImg: string;
  date = new Date();
  currentPage = '';
  quote = "";
  song = "";

  songs = [
    'Avicii - Enough is Enough',
    'Kanye West - Everything We Need',
    ['Yandhi', 'https://youtu.be/B9IiqCQH9qM?list=FLW3yzOi3Bl2wCJ1dJwnl44A'],
    ['Frank Ocean - Strawberry Swing', 'https://youtu.be/G7wcRZWRDdw'],
    ['', 'https://youtu.be/KvA1cmT2TYc'],
    ''

  ]

  quotes = [
    "memento mori",
    "I felt the unconventional.",
    "Anguish shapes integrity.",
    "I love myself, always.",
    "perfect timing",
    "Today is the first day of the rest of your life.",
    "Reconsider your self-set limitations.",
    "Slow motion better than no motion.",
    "Remember...every passing moment is a chance to turn it all around.",
    "&#9698;&#9700;",
    "money ain't real, time ain't real",
    "woke up and felt the vibe",
    "without you it's a waste of time"

  ];

  pfpWidth: number;

  constructor(private router: Router) {
    this.currentPage = this.router.url.substring(1);

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPage = event.url.substring(1);
        // this.togglePfp();
        console.log(this.currentPage);
      }
    });

  }

  ngOnInit(): void {
    //timer
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    // const options: BodyScrollOptions = {
    //   reserveScrollBarGap: true,
    // };

    // disableBodyScroll(document.getElementsByClassName('router-container')[0], options);

    if (this.currentPage === '') {
      setTimeout(() => {
        this.getQuote();
      }, 200);
    }

    this.bgImg = "../../assets/bg-" + (this.getRandomNumber(3) + 1) + ".jpg";

  }

  // [0, num)
  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getQuote(): void {
    this.quote = this.quotes[this.getRandomNumber(this.quotes.length)];

    if (this.quote === '&#9698;&#9700;') {
      const quoElem: HTMLElement = this.quoteElem.nativeElement;
      quoElem.style.fontSize = "35px"
      quoElem.innerHTML = this.quote;
      this.quote = '';
    }
  }

  onResized(event: ResizedEvent): void {
    this.pfpWidth = event.newWidth;
    console.log(this.pfpWidth)
  }

  enterSite(): void {
    this.router.navigateByUrl('/creative');
  }
}
