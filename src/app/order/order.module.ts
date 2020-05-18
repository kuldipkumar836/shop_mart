import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
  PaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
