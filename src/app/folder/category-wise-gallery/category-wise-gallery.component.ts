import { Component, OnInit } from '@angular/core';
import { GalleryImagesService } from '../gallery-images.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-category-wise-gallery',
    templateUrl: './category-wise-gallery.component.html',
    styleUrls: ['./category-wise-gallery.component.scss'],
})
export class CategoryWiseGalleryComponent implements OnInit {
    categoryName = 'Category';
    imagesList = [];

    constructor(
        private galleryImagesService: GalleryImagesService,
        private router: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.categoryName = this.router.snapshot.paramMap.get('categoryName');
        this.imagesList = this.galleryImagesService.getLibrary(this.categoryName) || [];
    }

    // showImage(item) {
    //     this.fullScreenImage.showImageURL(item.webURL)
    //         .then((data: any) => console.log(data))
    //         .catch((error: any) => console.error(error));
    // }

}
