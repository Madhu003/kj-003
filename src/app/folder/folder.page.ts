import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GalleryImagesService } from './gallery-images.service';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;
    categories: any = [];
    library = [];
    // categories = [];
    showSpinner = true;

    constructor(
        private photoLibrary: PhotoLibrary,
        private cd: ChangeDetectorRef,
        private camera: Camera,
        private alertController: AlertController,
        private galleryImagesService: GalleryImagesService,
        private router: Router,
        public loadingController: LoadingController
    ) {
    }

    ngOnInit() {
        this.getPhotoLibrary();
    }

    goToImagesByTags() {
        this.router.navigateByUrl('/gallery/images-by-tags');
    }

    getErrorInImage(event) {
        event.target.src = 'assets/error-image-generic.png';
    }

    async getPhotoLibrary() {
        if (this.galleryImagesService.getLibrary()) {
            this.categories = this.galleryImagesService.getLibrary();
        } else {
            let loading = await this.presentLoading();
            this.photoLibrary.requestAuthorization().then(() => {
                this.photoLibrary.getLibrary().subscribe({
                    next: res => {
                        console.log(this);
                        loading.dismiss();
                        this.library = this.library.concat(res['library']);

                        this.library.forEach(item => {
                            const { id } = item;
                            const url = 'file://' + id.split(';')[1];
                            item.webURL = window['Ionic']['WebView'].convertFileSrc(url);

                            const idArray = item.id.split('/');
                            const category = idArray[idArray.length - 2];
                            this.categories[category] = this.categories[category] || [];
                            this.categories[category].push(item);
                        });

                        const categories = [];
                        // tslint:disable-next-line: forin
                        for (const key in this.categories) {
                            categories.push({
                                name: key,
                                list: this.categories[key]
                            });
                        }

                        this.categories = categories;
                        this.galleryImagesService.setLibrary(categories);

                        this.cd.detectChanges();
                        this.showSpinner = false;

                    },
                    error: err => {
                        console.log('could not get photos');
                        this.showSpinner = false;
                        loading.dismiss();
                    },
                    complete: () => {
                        this.showSpinner = false;
                        console.log('done getting photos');
                        loading.dismiss();
                    }
                });
            }).catch(err => {
                this.showSpinner = false;
                console.log('permissions weren\'t granted');
                this.presentAlert();
                loading.dismiss();
            });
        }
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            //   duration: 2000
        });
        await loading.present();
        return loading;
    }

    searchByTag(event) {
        if (event.detail.value) {
            console.log(event.detail.value)
        } else {
            console.log("cleared");
        }
    }

    goToTappedCategory(event, item) {
        this.router.navigateByUrl('/gallery/category/' + item.name);
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: [{
                text: 'OK',
                handler: data => {
                    // this.getPhotoLibrary()
                }
            }]
        });

        await alert.present();
    }

    openCamera() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options)
            .then(
                imageData => console.log(imageData),
                err => console.log(err)
            );
    }


}
