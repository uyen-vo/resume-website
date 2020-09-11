import { Component, OnInit, Input } from '@angular/core';
import { CreaItem, ItemService } from '../item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss']
})

export class CreativeComponent implements OnInit {

  creaItems$: Observable<CreaItem[]>;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.creaItems$ = this.itemService.getCreaItems();
  }

}
