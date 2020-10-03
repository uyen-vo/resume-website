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
    ]),
    trigger('animateFade', [
      state('void', style({ opacity: '0', zIndex: '-1' })),
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
  mobileSnackbarToggle: boolean;
  galleryPreview: HTMLCollectionOf<Element>;
  isEnlarged: boolean;

  constructor() { }

  ngOnInit(): void {
    this.galleryToggle = false;
    this.curImageSrc = '';
    this.isEnlarged = false;
    this.curIndex = 0;
    this.snackbarToggle = false;
    this.mobileSnackbarToggle = false;
    this.galleryPreview = document.getElementsByClassName('gallery-preview');
  }

  openGallery(imgSrc: string, index?: number): void {
    this.galleryToggle = true;
    this.snackbarToggle = true;
    this.mobileSnackbarToggle = true;
    this.curImageSrc = imgSrc;

    if (index) {
      this.curIndex = index;
    } else {
      this.curIndex = 0;
    }

    setTimeout(() => {
      this.snackbarToggle = false;
    }, 2000);

    setTimeout(() => {
      this.mobileSnackbarToggle = false;
    }, 1700);
  }

  closeGallery(): void {
    this.galleryToggle = false;

    if (this.isEnlarged) {
      this.enlarge();
    }
  }

  onMainImageClick(event: MouseEvent): void {
    if (window.innerWidth > 959) {
      event.stopPropagation();
    }
  }

  onImageClick(event: MouseEvent, index: number): void {
    event.stopPropagation();

    this.curIndex = index;
    this.swapCurImage('');
  }

  navigate(dir: string, event: MouseEvent): void{
    event.stopPropagation();
  }

  swapCurImage(dir: string, event?: MouseEvent): void {
    if (dir === 'right') {
      this.curIndex++;
    } else if (dir === 'left') {
      this.curIndex--;
    }

    if (event) {
      event.stopPropagation();
    }

    this.curImage = (this.galleryPreview[this.curIndex] as HTMLImageElement);
    // this.curImage.style.filter = 'brightness(100%)';
    // this.curImage.style.border = '10px solid white';
    this.curImageSrc = this.curImage.src;

  }

  enlarge(): void {
    this.isEnlarged = this.isEnlarged === false ? true : false;
    const prevList = document.getElementsByClassName('prev-list')[0] as HTMLElement;
    const mainImage = document.getElementById('main-img') as HTMLElement;
    const imgContainer = document.getElementsByClassName('img-container-outer')[0] as HTMLElement;

    prevList.classList.toggle('prev-enlarged');

    mainImage.classList.toggle('main-enlarged');

    imgContainer.classList.toggle('enlarged');
  }

  swipe(action: string): void {
    if (action === 'swipeleft' && this.curIndex !== this.galleryPreview.length - 1) {
      this.swapCurImage('right');
    }
    if (action === 'swiperight' && this.curIndex !== 0) {
      this.swapCurImage('left');
    }
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  handleKeyboardLeft(event: KeyboardEvent): void {
    if (this.curIndex !== 0) {
      this.swapCurImage('left');
    }
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  handleKeyboardRight(event: KeyboardEvent): void {
    if (this.curIndex !== this.previews.length - 1) {
      this.swapCurImage('right');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.closeGallery();
  }
}
