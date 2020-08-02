import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../Admin/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public Price = 500;
  public totalPrice: number;
  
  private itemValue = new BehaviorSubject(0);
  private itemQuantity = new BehaviorSubject(1);
  private itemPrice = new BehaviorSubject(this.Price);
  currentItemValue = this.itemValue.asObservable();
  currentItemPrice = this.itemPrice.asObservable();
  currentItemQuantity = this.itemQuantity.asObservable();

  constructor(private afs:AngularFirestore,) { }
  cartIncrement(value: number){
    this.itemValue.next(value);
  }
  saveInCart(cartData: string){
    return this.afs.collection('cart').add(cartData);
}
  //removeFromCart(itemId: string){
 //   return this.afs.doc(`cart/${itemId}`).delete();
//}
  getCartProduct(){
       return this.afs.collection('cart').snapshotChanges();
     }
  cartDecrement(value: number){
    this.itemValue.next(value);
  }
  totalAmount(value: number){
    this.totalPrice = this.Price * value;
   this.itemPrice.next(this.totalPrice);
  }
}
