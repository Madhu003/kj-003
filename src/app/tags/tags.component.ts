import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    tags = [];

    constructor(
        public alertController: AlertController
    ) { }

    ngOnInit() {
        this.tags = [
            { name: 'Gold' },
            { name: 'Silver' },
            { name: 'Order-645' },
            { name: 'Bill-555' },
            { name: 'Rings' }
        ];
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
