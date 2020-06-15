import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  list: [{}, {}];
  photoLibrary: PhotoLibrary = new PhotoLibrary();
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          this.list = library['library'];
          // library.forEach(function (libraryItem) {
          //   console.log(libraryItem.id);          // ID of the photo
          //   console.log(libraryItem.photoURL);    // Cross-platform access to photo
          //   console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
          //   console.log(libraryItem.fileName);
          //   console.log(libraryItem.width);
          //   console.log(libraryItem.height);
          //   console.log(libraryItem.creationDate);
          //   console.log(libraryItem.latitude);
          //   console.log(libraryItem.longitude);
          //   console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          // });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
      .catch(err => console.log('permissions weren\'t granted'));
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
