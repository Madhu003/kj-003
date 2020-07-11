import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'thumbnail-image',
  templateUrl: './thumbnail-image.component.html',
  styleUrls: ['./thumbnail-image.component.scss'],
})
export class ThumbnailImageComponent implements OnInit, OnDestroy {
  @Input() image;
  @Input() isSlectionModeOn;
  isSelected = false;
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // console.log(this);
    this.eventsSubscription = this.events.subscribe(() => {
      this.image.isSelected = !this.image.isSelected;
      this.cd.detectChanges();
    });
  }

  getErrorInImage(event) {
    event.target.src = 'assets/error-image-generic.png';
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
