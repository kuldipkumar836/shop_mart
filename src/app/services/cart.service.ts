import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../Admin/product.model';
import { Cart } from '../cart/cart.model';
import { AuthService } from '../auth/auth.service';

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

  constructor(
    private afs:AngularFirestore,
    ) {

     }
  cartIncrement(value: number){
    this.itemValue.next(value);
  }
  saveInCart(id:string, userId: string, cartData: Cart){
    return this.afs.collection(`cart/${userId}/cartItems`).doc(id).set(cartData);
}
  //removeFromCart(itemId: string){
 //   return this.afs.doc(`cart/${itemId}`).delete();
//}
  getCartProduct( userId: string,){
       return this.afs.collection(`cart/${userId}/cartItems`).snapshotChanges();
     }
  deleteCartProduct(id: string, userId: string,){
       return this.afs.doc(`cart/${userId}/cartItems/${id}`).delete();
     }
  cartDecrement(value: number){
    this.itemValue.next(value);
  }
  totalAmount(value: number){
    this.totalPrice = this.Price * value;
   this.itemPrice.next(this.totalPrice);
  }
}
