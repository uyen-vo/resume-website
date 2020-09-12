import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() previews: string[];
  galleryToggle: boolean;

  constructor() { }

  ngOnInit(): void {
    this.galleryToggle = false;
  }

  openGallery(event: ElementRef): void {
    this.galleryToggle = true;
    event.nativeElement.style.imageSrc 
  }
}
