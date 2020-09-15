import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

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

  isEnlarged: boolean;

  constructor() { }

  ngOnInit(): void {
    this.galleryToggle = false;
    this.curImageSrc = '';
    this.isEnlarged = false;
  }

  openGallery(imgSrc: string, index: number): void {
    this.galleryToggle = true;
    this.curImageSrc = imgSrc;
    this.curIndex = index;

    console.log(index + " " + imgSrc);
    // this.swapCurImage('');
  }

  closeGallery(): void {
    this.galleryToggle = false;
  }

  onMainImageClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onImageClick(event: MouseEvent, index: number): void {
    event.stopPropagation();

    this.curIndex = index;
    this.swapCurImage('');

    // console.log(index)
  }

  // setMapCoords(): void {
  //   const areas = document.getElementsByTagName('area');
  //   const w = document.getElementById('main-img').clientWidth;
  //   const h = document.getElementById('main-img').clientHeight;

  //   areas[0].coords = "0, 0, 40," + h;
  //   areas[1].coords = (w - 40) + ",0," + w + "," + h;
  // }

  navigate(dir: string, event: MouseEvent) {
    event.stopPropagation();

    // if (dir === 'right') {
    //   this.curIndex++;
    // } else {
    //   this.curIndex--;
    // }

    // this.swapCurImage();
  }

  swapCurImage(dir: string, event?: MouseEvent): void {

    if (this.curImage) {
      this.curImage.style.filter = 'brightness(30%) grayscale(100%)';
    }
    if (dir === 'right') {
      this.curIndex++;
    } else if (dir === 'left') {
      this.curIndex--;
    }

    if (event) {
      event.stopPropagation();
    }

    this.curImage = <HTMLImageElement>document.getElementsByClassName("gallery-preview")[this.curIndex];
    this.curImage.style.filter = 'brightness(100%)';
    this.curImage.style.border = '1px solid white';
    // this.curImage.style.transform = 'scale(1.2)';
    this.curImageSrc = this.curImage.src;

  }

  enlarge(mainImage: HTMLElement): void {
    this.isEnlarged = this.isEnlarged === false ? true : false;
    const prevList = document.getElementsByClassName('prev-list')[0] as HTMLElement;
    const imgContainer = document.getElementsByClassName('img-container-outer')[0] as HTMLElement;
    // const mainContainer = document.getElementsByClassName('main-container')[0] as HTMLElement;

    prevList.classList.toggle('prev-enlarged');

    mainImage.classList.toggle('main-enlarged')

    imgContainer.classList.toggle('enlarged');
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleKeyboardLeft(event: KeyboardEvent) {
    if (this.curIndex != 0) {
      this.swapCurImage('left');
    }
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleKeyboardRight(event: KeyboardEvent) {
    if (this.curIndex != this.previews.length - 1) {
      this.swapCurImage('right');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeGallery();
  }
}
