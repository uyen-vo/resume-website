import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { CreaItem } from '../item.service';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  animations: [
    trigger('animateDestroy', [
      state('void', style({ top: '-100px' })),
      transition('* => void', animate('300ms ease-in'))
    ])
  ]
})
export class LightboxComponent implements OnInit {
  
  @Input() previews: string[];
  @Input() title: string;
  @Input() thumbnail: boolean;
  @Input() creaItem?: CreaItem;

  galleryToggle: boolean;
  curImageSrc: string;
  curIndex: number;
  curImage: HTMLImageElement;
  snackbarToggle: boolean;
  galleryPreview: HTMLCollectionOf<Element>;
  isEnlarged: boolean;

  constructor() { }

  ngOnInit(): void {
    this.galleryToggle = false;
    this.curImageSrc = '';
    this.isEnlarged = false;
    this.curIndex = 0;
    this.snackbarToggle = false;
    this.galleryPreview = document.getElementsByClassName('gallery-preview');
  }

  openGallery(imgSrc: string, index?: number): void {
    this.galleryToggle = true;
    this.snackbarToggle = true;
    this.curImageSrc = imgSrc;

    if (index) {
      this.curIndex = index;
    } else {
      this.curIndex = 0;
    }

    setTimeout(() => {
      this.snackbarToggle = false;
    }, 3000);
  }

  closeGallery(): void {
    this.galleryToggle = false;

    if (this.isEnlarged) {
      this.enlarge();
    }
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
      // this.curImage.style.filter = 'brightness(30%) grayscale(100%)';

      // this.curImage.style.border = '1px solid black';
    }
    if (dir === 'right') {
      this.curIndex++;
    } else if (dir === 'left') {
      this.curIndex--;
    }

    if (event) {
      event.stopPropagation();
    }

    this.curImage = <HTMLImageElement>this.galleryPreview[this.curIndex];
    // this.curImage.style.filter = 'brightness(100%)';
    // this.curImage.style.border = '10px solid white';
    this.curImageSrc = this.curImage.src;

  }

  enlarge(): void {
    this.isEnlarged = this.isEnlarged === false ? true : false;
    const prevList = document.getElementsByClassName('prev-list')[0] as HTMLElement;
    const mainImage = document.getElementById('main-img') as HTMLElement;
    const imgContainer = document.getElementsByClassName('img-container-outer')[0] as HTMLElement;
    // const mainContainer = document.getElementsByClassName('main-container')[0] as HTMLElement;

    prevList.classList.toggle('prev-enlarged');

    mainImage.classList.toggle('main-enlarged');

    imgContainer.classList.toggle('enlarged');
  }

  swipe(action: string): void {
    if (action === 'swipeleft' && this.curIndex !== this.galleryPreview.length-1) {
      this.swapCurImage('right');
    }
    if (action === 'swiperight' && this.curIndex !== 0) {
      this.swapCurImage('left');
    }
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

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   let innerWidth = window.innerWidth;
  //   if (innerWidth <= 599) {
  //     // this.enlarge();
  //     this.isEnlarged = true;
  //   } 
  // }
}
