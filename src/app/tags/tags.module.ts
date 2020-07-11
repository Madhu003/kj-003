import { TagsComponent } from './tags.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TagsRoutingModule } from './tags-routing.module';
import { ImagesByTagsComponent } from '../folder/images-by-tags/images-by-tags.component';
import { CommanService } from '../comman.service';

@NgModule({
    declarations: [
        TagsComponent,
        ImagesByTagsComponent
    ],
    imports: [
        CommonModule,
        TagsRoutingModule,
        FormsModule
    ],
    providers: [
        CommanService
    ]
})
export class TagsModule { }
