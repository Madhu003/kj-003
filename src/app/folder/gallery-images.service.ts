import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class GalleryImagesService {
    library = [];
    constructor(private platform: Platform) {
        const baseURL = 'https://homepages.cae.wisc.edu/~ece533/images/';
        let list = [
            {
                name: 'sample1',
                list: [
                    { webURL: `${baseURL}airplane.png` },
                    { webURL: `${baseURL}arctichare.png` },
                    { webURL: `${baseURL}baboon.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` }, { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },

                ]
            },
            {
                name: 'sample2',
                list: [
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                ]
            },
            {
                name: 'sample3',
                list: [
                    { webURL: `${baseURL}airplane.png` },
                    { webURL: `${baseURL}arctichare.png` },
                    { webURL: `${baseURL}baboon.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` }, { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },

                ]
            },
            {
                name: 'sample4',
                list: [
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                    { webURL: `${baseURL}barbara.png` },
                    { webURL: `${baseURL}boat.png` },
                    { webURL: `${baseURL}cat.png` },
                    { webURL: `${baseURL}barfruitsbara.png` },
                ]
            },
        ];

        for (let i = 0; i < 1000; i++) {
            this.library = [...this.library, ...list];
        }
    }

    setLibrary(library) {
        this.library = library;
    }

    getLibrary(categoryName?) {
        if (categoryName) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.library.length; i++) {
                if (this.library[i].name == categoryName) {
                    return this.library[i].list;
                }
            }
        } else if (!categoryName) {
            return this.library.length > 0 ? this.library : null;
        }

        return null;
    }
}
