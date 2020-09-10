import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, keyframes, style, animate, transition, query } from '@angular/animations';
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
            style({ opacity: 0 }),
            animate('1s ease-out',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-out',
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

  time = new Date();
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
    "Slow motion better than no motion."
  ];

  @ViewChild('crePfp') crePfp: ElementRef;
  @ViewChild('devPfp') devPfp: ElementRef;


  constructor(private router: Router) {
    this.currentPage = this.router.url.substring(1);

    router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        this.currentPage = event.url.substring(1);
        this.togglePfp();
        console.log(this.currentPage);
      }
    });

    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  ngOnInit(): void {
    //timer
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.togglePfp();
  }

  togglePfp() : void {
    if (this.currentPage !== '') {
      setTimeout(() => {
        const elCre: HTMLElement = this.crePfp.nativeElement;
        const elDev: HTMLElement = this.devPfp.nativeElement;

        elCre.classList.remove("opaque");
        elDev.classList.remove("opaque");

        if (this.currentPage === "creative") {
          elCre.classList.add("opaque");
        } else if (this.currentPage === "developer") {
          elDev.classList.add("opaque");
        }
      });
    }
    

    // document.getElementsByClassName("pfps")[0].classList.remove("opaque");
    // document.getElementsByClassName("pfps")[1].classList.remove("opaque");

    // document.getElementsByClassName(this.currentPage)[0].classList.add("opaque");
    
  }


}
