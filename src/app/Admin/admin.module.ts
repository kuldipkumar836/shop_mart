import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddItemComponent } from './add-item/add-item.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { FileComponent } from './file/file.component';
import { ActionBarComponent } from './action-bar/action-bar.component';


@NgModule({
  declarations: [
   AddItemComponent,
    ItemsListComponent,
    ActionBarComponent,
    FileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
