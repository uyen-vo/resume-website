import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevItem, ItemService } from '../item.service';
// import { trigger, transition, style, animate, stagger, query, state } from '@angular/animations';
// import { map } from 'rxjs/operators';
import { listStaggerDev } from '../animations';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
  animations: [listStaggerDev]
})
export class DeveloperComponent implements OnInit
{

  devItems$: Observable<DevItem[]>;
  // itemsLength : number;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void
  {
    this.devItems$ = this.itemService.getDevItems();
    // this.devItems$.pipe(
    //   map(data => {
    //     this.itemsLength = data.length;
    //   }));
  }

}
