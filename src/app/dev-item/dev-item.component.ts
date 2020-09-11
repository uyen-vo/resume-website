import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DevItem } from '../item.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dev-item',
  templateUrl: './dev-item.component.html',
  styleUrls: ['./dev-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('*, out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('* => *', animate('.3s ease-in-out'))
    ])
  ]
})
export class DevItemComponent implements OnInit {

  @ViewChild('toggleRef') toggleElem: ElementRef;
  @Input() devItem: DevItem;

  toggleState : string;

  constructor() { }

  ngOnInit(): void { }

  toggleViewMore() : void {
    <HTMLElement>(this.toggleElem.nativeElement).classList.toggle("toggle-active");
    this.toggleState = this.toggleState === 'in' ? 'out' : 'in';
  }
}
