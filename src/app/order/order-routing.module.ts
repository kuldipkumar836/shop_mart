import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemCheckoutComponent } from './item-checkout/item-checkout.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  { path: 'order', component: ItemCheckoutComponent },
  { path: 'orderList', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
