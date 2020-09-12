import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DevItem } from '../item.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dev-item',
  templateUrl: './dev-item.component.html',
  styleUrls: ['./dev-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true, *', style({
        height: '*'
      })),
      state('false, void', style({
        height: '0'
      })),
      transition('* => *', animate('.3s ease-in-out'))
    ])
  ]
})
export class DevItemComponent implements OnInit {

  @ViewChild('toggleRef') toggleElem: ElementRef;
  @Input() devItem: DevItem;

  toggleViewMore: boolean;

  constructor() { }

  ngOnInit(): void {
    this.toggleViewMore = false;
  }

  togglePreview(): void {
    //   <HTMLElement>(this.toggleElem.nativeElement).classList.toggle("toggle-active");
    //   this.toggleViewMore = this.toggleViewMore === 'true' ? 'false' : 'true';
    //   console.log(this.toggleViewMore)

    // this.toggleViewMore = true ? false : true
  }
}
