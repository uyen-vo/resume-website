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
  quote: string;
  song: string;
  songLink: string;
  pfpWidth: number;

  songs = [
    'Avicii - Enough is Enough',
    'Kanye West - Everything We Need',
    ['Yandhi', 'https://youtu.be/B9IiqCQH9qM?list=FLW3yzOi3Bl2wCJ1dJwnl44A'],
    ['Frank Ocean - Strawberry Swing', 'https://youtu.be/G7wcRZWRDdw'],
    ['', 'https://youtu.be/KvA1cmT2TYc']
  ];

  quotes = [
    'memento mori',
    'I felt the unconventional.',
    'Anguish shapes integrity.',
    'I love myself, always.',
    'perfect timing',
    'Today is the first day of the rest of your life.',
    'Reconsider your self-set limitations.',
    'Slow motion better than no motion.',
    'Every passing moment is a chance to turn it all around.',
    '&#9698; &#9700;',
    'woke up and felt the vibe',
    'Too weird to live. To rare to die.',
    'we are one',
    'looking up, there\'s always sky',
    "Never a failure. Always a lesson.",
    "Simplicity is the greatest sophistication."
  ];

  constructor(private router: Router) {
    this.currentPage = this.router.url.substring(1);

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentPage = event.url.substring(1);

        if (this.currentPage === '') {
          this.loadLandingPage();
        }
        console.log(this.currentPage);
      }
    });

  }

  ngOnInit(): void {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos || window.pageYOffset < 50) {
        document.getElementById('mobile-nav').style.top = '60px';
      } else {
        document.getElementById('mobile-nav').style.top = '0px';
      }
      prevScrollpos = currentScrollPos;
    };


    this.song = '';
    this.quote = '';
    this.songLink = '';

    // timer
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    // const options: BodyScrollOptions = {
    //   reserveScrollBarGap: true,
    // };

    // disableBodyScroll(document.getElementsByClassName('router-container')[0], options);

    if (this.currentPage === '') {
      this.loadLandingPage();
    }

  }

  loadLandingPage(): void {
    setTimeout(() => {
      this.getQuote();
    }, 200);

    this.bgImg = '../../assets/bg-' + (this.getRandomNumber(3) + 1) + '.jpg';

    const randomSong = this.songs[this.getRandomNumber(this.songs.length)];
    this.songLink = '';

    if (randomSong instanceof Array) {
      if (randomSong[0] === '') {
        this.song = '  ' + randomSong[1];
      } else {
        this.song = '  ' + randomSong[0];
      }

      this.songLink = randomSong[1];
    } else {
      this.song = randomSong;
    }

  }

  onSongClick(): void {
    //{{songLink}}" target="_blank"
    if (this.songLink === '') {
      this.router.navigateByUrl('/creative');
    } else {
      window.open(this.songLink, '_blank');
    }
  }
  // [0, num)
  getRandomNumber(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getQuote(): void {
    this.quote = this.quotes[this.getRandomNumber(this.quotes.length)];

    if (this.quote === '&#9698; &#9700;') {
      const quoElem: HTMLElement = this.quoteElem.nativeElement;
      quoElem.style.fontSize = '35px';
      quoElem.style.letterSpacing = '-4px';
      quoElem.innerHTML = this.quote;
      this.quote = '';
    }
  }

  onResized(event: ResizedEvent): void {
    if (window.innerWidth > 599) {
      this.pfpWidth = event.newWidth;
    } else {
      this.pfpWidth = event.newWidth * .7;
    }
    console.log(event.newWidth + ' ' + this.pfpWidth);
  }

  enterSite(): void {
    this.router.navigateByUrl('/creative');
  }
}
