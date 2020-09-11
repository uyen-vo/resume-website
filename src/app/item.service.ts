import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

export interface DevItem {
  title: string;
  tags: string[];
  image: string;
  description: string;
  github: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getDevItems() {
    return this.http.get<DevItem[]>('../assets/dev-projects.json');
  }
}
