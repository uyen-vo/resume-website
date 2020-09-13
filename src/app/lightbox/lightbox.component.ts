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

    this.setMapCoords();
    this.curImage.style.filter = 'brightness(100%)';
  }

  onImageClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  setMapCoords(): void {
    const areas = document.getElementsByTagName('area');
    const w = document.getElementById('main-img').clientWidth;
    const h = document.getElementById('main-img').clientHeight;

    areas[0].coords = "0, 0, 40," + h;
    areas[1].coords = (w - 40) + ",0," + w + "," + h;
  }


}
