import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
        private activatedRoute: ActivatedRoute,
        private photoLibrary: PhotoLibrary,
        private cd: ChangeDetectorRef,
        private camera: Camera,
        private alertController: AlertController,
        private galleryImagesService: GalleryImagesService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getPhotoLibrary();
    }

    getPhotoLibrary() {
        this.photoLibrary.requestAuthorization().then(() => {
            this.photoLibrary.getLibrary().subscribe({
                next: res => {
                    console.log(this);
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

                },
                complete: () => {
                    this.showSpinner = false;

                    console.log('done getting photos');
                }
            });
        }).catch(err => {
            this.showSpinner = false;
            console.log('permissions weren\'t granted');
            this.presentAlert();
        });
    }

    getKeys() {
        return Object.keys(this.categories);
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
