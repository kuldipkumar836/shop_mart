import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { ItemCheckoutComponent } from './item-checkout/item-checkout.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
  PaymentComponent,
  ItemCheckoutComponent,
  OrderListComponent
],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
