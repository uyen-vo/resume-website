import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CreaItem, ItemService } from '../item.service';
import { Observable } from 'rxjs';

import { listStaggerCreative } from '../animations';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss'],
  animations: [listStaggerCreative]
  // encapsulation: ViewEncapsulation.None
})

export class CreativeComponent implements OnInit {

  creaItems$: Observable<CreaItem[]>;
  images: HTMLCollectionOf<Element>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.creaItems$ = this.itemService.getCreaItems();
    this.images = document.getElementsByClassName('creative-img');
  }

  hover(target: HTMLElement): void {
    for (var i = 0; i < this.images.length; i++) {
      const elem = this.images.item(i) as HTMLElement;
      if (elem != target) {
        elem.style.opacity = ".5";
      }
    }
  }

  unhover(target: HTMLElement): void {
    for (var i = 0; i < this.images.length; i++) {
      const elem = this.images.item(i) as HTMLElement;
      elem.style.opacity = "1";
    }

  }
}
