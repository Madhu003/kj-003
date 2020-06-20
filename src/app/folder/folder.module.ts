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
    CategoryWiseGalleryComponent
  ],
  providers: [
    PhotoLibrary,
    CDVPhotoLibraryPipe,
    Camera,
    PhotoViewer,
    AlertController
  ]
})
export class FolderPageModule { }
