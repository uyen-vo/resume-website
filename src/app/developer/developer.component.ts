import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DevItem, ItemService } from '../item.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  devItems$: Observable<DevItem[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.devItems$ = this.itemService.getDevItems();
    console.log(this.devItems$)
  }

}
