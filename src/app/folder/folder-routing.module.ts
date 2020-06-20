import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { CategoryWiseGalleryComponent } from './category-wise-gallery/category-wise-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'category/:categoryName',
    component: CategoryWiseGalleryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
