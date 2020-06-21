import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-images-by-tags',
    templateUrl: './images-by-tags.component.html',
    styleUrls: ['./images-by-tags.component.scss'],
})
export class ImagesByTagsComponent implements OnInit {
    categories = [];
    constructor() { }

    ngOnInit() { }

}
