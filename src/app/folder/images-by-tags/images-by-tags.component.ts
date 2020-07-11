import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GalleryImagesService } from '../gallery-images.service';
import { ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'app-images-by-tags',
    templateUrl: './images-by-tags.component.html',
    styleUrls: ['./images-by-tags.component.scss'],
})
export class ImagesByTagsComponent implements OnInit, OnDestroy {
    categories = [];
    mainList = [];
    imagesList = [];
    height = window.innerHeight + 'px';
    isFromTags: any;
    modal: any;
    tag: any;

    constructor(
        private galleryImagesService: GalleryImagesService,
        private modalController: ModalController
    ) {
        console.log(this);
    }

    ngOnInit() {
        if (this.isFromTags) {
            setTimeout(() => {
                const searchElement = document.querySelector('input[type=search]');
                searchElement['value'] = '.';
                this.searchByTag();
            }, 500);
        }

        const list = this.galleryImagesService.getLibrary();

        list.forEach(element => {
            element.list.forEach(image => {
                image.tags = [element.name.toLowerCase()];
                image.eventsSubject = new Subject<void>();
                this.mainList.push(image);
            });
        });

        this.setImagesList(this.mainList.slice(0, 8));
    }

    searchByTag(event = { detail: { value: '.' } }) {
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

    clickOnImage(item) {
        if (this.isFromTags) {
            console.log(item);
            item.eventsSubject.next();
        } else {
            this.showImage(item);
        }
    }

    popAllSelectedImages() {
        this.tag.images = [];
        // this.tag.images.push();
        console.log(this.mainList.filter(item => item.isSelected));
        this.modal.dismiss();
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

    ngOnDestroy(){

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
