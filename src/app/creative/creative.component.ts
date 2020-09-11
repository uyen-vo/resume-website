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

export class CreativeComponent implements OnInit
{

  creaItems$: Observable<CreaItem[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void
  {
    this.creaItems$ = this.itemService.getCreaItems();


  }

}
