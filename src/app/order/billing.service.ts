import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Order } from '../order/order.model';


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private afs:AngularFirestore
  ) { }
  saveOrder(itemData: Order){
    return this.afs.collection('orders').add(itemData);
    };
}
