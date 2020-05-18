import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() { }
  cartIncrement(value: number){
    this.itemValue.next(value);
  }
  cartDecrement(value: number){
    this.itemValue.next(value);
  }
  totalAmount(value: number){
    this.totalPrice = this.Price * value;
   this.itemPrice.next(this.totalPrice);
  }
}
