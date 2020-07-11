import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ImagesByTagsComponent } from '../folder/images-by-tags/images-by-tags.component';
import { CommanService } from '../comman.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    tags = [];

    constructor(
        public alertController: AlertController,
        private modalController: ModalController,
        private commanService: CommanService
    ) { }

    ngOnInit() {
        this.tags = this.commanService.getAllTags();
    }

    getINputValue(event, tag) {
        tag.name = event.target.value;
    }

    setEditable(tag) {
        this.tags.forEach(item => {
            if (item.name == tag.name) {
                item.isInEditMode = !item.isInEditMode;

                if (item.isInEditMode) {
                    setTimeout(() => {
                        document.querySelector('#tag-edit input')['focus']();
                    }, 500);
                }
            } else {
                item.isInEditMode = false;
            }
        });
    }

    async selectImages(tag) {
        const currentModal = await this.modalController.create({
            component: ImagesByTagsComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                isFromTags: true,
                tag
            },
            showBackdrop: true,
            swipeToClose: true
        });
        return await currentModal.present();
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'New Tag',
            inputs: [
                {
                    name: 'tagName',
                    type: 'text',
                    placeholder: 'Enter Your New Tag'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Ok',
                    handler: (inputObj) => {
                        this.tags.push({ name: inputObj.tagName });
                    }
                }
            ]
        });

        await alert.present();
    }
}
