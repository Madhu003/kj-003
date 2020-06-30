import { Component, OnInit } from '@angular/core';
import { GalleryImagesService } from '../gallery-images.service';
import { ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
    selector: 'app-images-by-tags',
    templateUrl: './images-by-tags.component.html',
    styleUrls: ['./images-by-tags.component.scss'],
})
export class ImagesByTagsComponent implements OnInit {
    categories = [];
    mainList = [];
    imagesList = [];
    height = window.innerHeight + 'px';
    constructor(
        private galleryImagesService: GalleryImagesService,
        private modalController: ModalController
    ) {
        console.log(this);
    }

    getErrorInImage(event) {
        event.target.src = 'assets/error-image-generic.png';
    }

    searchByTag(event) {
        let keywordList;
        if (event.detail.value === '.') {
            this.setImagesList(this.mainList);
            return;
        }
        if (event.detail.value.indexOf('#') > -1) {
            keywordList = event.detail.value.trim().split('#');
        } else {
            keywordList = [event.detail.value];
        }

        let imagesList = [];

        this.mainList.forEach(image => {

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < keywordList.length; i++) {
                const ketWord = keywordList[i].trim().toLowerCase();
                // console.log((image.tags.indexOf(ketWord) > -1), ketWord, JSON.stringify(image));
                if (ketWord && image.tags.indexOf(ketWord) > -1) {
                    imagesList.push(image);
                    break;
                }
            }
        });

        this.setImagesList(imagesList);
        // console.log(JSON.stringify(this.imagesList, null, 4));
    }

    setImagesList(imagesList) {
        this.imagesList = [];
        // tslint:disable-next-line: prefer-for-of
        while (imagesList.length) {
            this.imagesList.push(imagesList.splice(0, 2));
        }
    }

    ngOnInit() {
        const list = this.galleryImagesService.getLibrary();
        console.log(list);

        list.forEach(element => {
            element.list.forEach(image => {
                image.tags = [element.name.toLowerCase()];
                this.mainList.push(image);
            });
        });

        this.setImagesList(this.mainList.slice(0, 8));
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

    // async shareButton() {
    //     try {
    //         await window.navigator.share({ title: "Example Page", url: "" });
    //         console.log("Data was shared successfully");
    //     } catch (err) {
    //         console.error("Share failed:", err.message);
    //     }
    // }

}
