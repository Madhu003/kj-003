import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GalleryImagesService {
    library = [];
    constructor() { }

    setLibrary(library) {
        this.library = library;
    }

    getLibrary(categoryName) {
        for (let i = 0; i < this.library.length; i++) {
            if (this.library[i].name == categoryName) {
                return this.library[i].list;
            }
        }
        return null;
    }
}
