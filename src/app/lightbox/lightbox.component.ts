import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() previews: string[];
  galleryToggle: boolean;
  curImageSrc: string;
  curIndex: number;
  curImage: HTMLImageElement;

  constructor() { }

  ngOnInit(): void {
    this.galleryToggle = false;
    this.curImageSrc = '/assets/smart-atm-1.JPG';
  }

  openGallery(imgSrc: string, index: number): void {
    this.galleryToggle = true;
    this.curImageSrc = imgSrc;
    this.curIndex = index;

    this.swapCurImage();
  }

  closeGallery(): void {
    this.curImage.style.filter = 'brightness(50%)';
    this.galleryToggle = false;
  }
  swapCurImage(): void {
    this.curImage = <HTMLImageElement>document.getElementsByClassName("gallery-preview")[this.curIndex];

    this.curImage.style.filter = 'brightness(100%)';
  }

  onImageClick(event: MouseEvent): void {
    event.stopPropagation();


  }


}
