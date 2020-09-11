import { Component, OnInit, Input } from '@angular/core';
import { DevItem } from '../item.service';

@Component({
  selector: 'app-dev-item',
  templateUrl: './dev-item.component.html',
  styleUrls: ['./dev-item.component.scss']
})
export class DevItemComponent implements OnInit {

  @Input() devItem: DevItem;

  constructor() { }

  ngOnInit(): void {
  }

}
