import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    modal: any;
    toggle = true;

    constructor() { }

    ngOnInit() {
        // console.log(this);
    }

    dismissModal() {
        this.modal.dismiss();
    }

    toggleHeaderAndFooter() {
        this.toggle = !this.toggle;
    }

}
