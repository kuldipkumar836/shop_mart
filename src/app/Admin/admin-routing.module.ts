import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { FileComponent } from './file/file.component';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [

  { path: 'header', component: HeaderComponent },
  { path: 'itemList', component: ItemsListComponent },
  { path: 'banner', component: FileComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'editItem/:itemId', component: AddItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
