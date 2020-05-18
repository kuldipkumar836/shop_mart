import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddItemComponent } from './add-item/add-item.component';
import { SharedModule } from '../shared/shared.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { HeaderComponent } from './header/header.component';
import { FileComponent } from './file/file.component';
import { AdminComponent } from '../admin/admin.component';

@NgModule({
  declarations: [
    AddItemComponent,
    ItemsListComponent,
    HeaderComponent,
    FileComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
