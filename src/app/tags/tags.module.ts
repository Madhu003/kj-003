import { TagsComponent } from './tags.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TagsRoutingModule } from './tags-routing.module';


@NgModule({
    declarations: [
        TagsComponent
    ],
    imports: [
        CommonModule,
        TagsRoutingModule,
        FormsModule
    ]
})
export class TagsModule { }
