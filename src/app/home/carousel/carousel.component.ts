import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut} from "./carousel.animations";
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *',  [useAnimation(fadeIn, {params: { time: '1300ms' }} )]),
      transition('* => void',[useAnimation(fadeOut, {params: { time: '1300ms' }})])
    ])
  ]
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() slides;
  currentSlide = 0;
  private timerSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
  }

  preloadImages() {
     for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }

  ngAfterViewInit() {
    this.timerSubscription = timer(3000, 3000).subscribe((nextSlide) => {
      this.onNextClick();
    })
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
