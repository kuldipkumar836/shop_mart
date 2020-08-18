import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  { path: 'cartItem/:itemId', component: CartItemComponent},
  { path: 'cartItems', component: CartItemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class CartRoutingModule { }
