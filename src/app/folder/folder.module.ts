import { NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

import CDVPhotoLibraryPipe from '../cdvphoto-library.pipe';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { FolderPage } from './folder.page';
import { CategoryWiseGalleryComponent } from './category-wise-gallery/category-wise-gallery.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ImagesByTagsComponent } from './images-by-tags/images-by-tags.component';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { CommanService } from '../comman.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [
    FolderPage,
    CDVPhotoLibraryPipe,
    CategoryWiseGalleryComponent,
    ImageViewerComponent,
    ImagesByTagsComponent,
    ThumbnailImageComponent
  ],
  providers: [
    PhotoLibrary,
    CDVPhotoLibraryPipe,
    Camera,
    PhotoViewer,
    AlertController,
    CommanService
  ]
})
export class FolderPageModule { }
