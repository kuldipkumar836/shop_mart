import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';

const routes: Routes = [
  { path: 'cartItem', component: CartItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
