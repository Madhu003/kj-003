import { Component, OnInit } from '@angular/core';
import { GalleryImagesService } from '../gallery-images.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
    selector: 'app-category-wise-gallery',
    templateUrl: './category-wise-gallery.component.html',
    styleUrls: ['./category-wise-gallery.component.scss'],
})
export class CategoryWiseGalleryComponent implements OnInit {
    categoryName = 'Category';
    imagesList = [];
    currentModal;
    height = '200';
    constructor(
        private galleryImagesService: GalleryImagesService,
        private router: ActivatedRoute,
        private modalController: ModalController
    ) {
        console.log(this)
     }

    ngOnInit() {
        this.categoryName = this.router.snapshot.paramMap.get('categoryName');
        this.imagesList = this.galleryImagesService.getLibrary(this.categoryName) || [];
        this.height = (window.innerHeight) + 'px';
    }

    async showImage(item) {
        const currentModal = await this.modalController.create({
            component: ImageViewerComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                image: item
            },
            showBackdrop: true,
            swipeToClose: true
        });
        return await currentModal.present();
    }

    async dismissModal() {
        await this.currentModal.dismiss();
    }

}
