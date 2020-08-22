import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cart } from '../cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: Cart;
  @Output() valueChanges = new EventEmitter();
  product_amt: number;
  qty: number;
  val = 1;
  data: any = {};
  @ViewChild('product_price') item_val: ElementRef;
  constructor() { }
  ngOnInit() {
    //console.log(value);
  }

  increaseNumber(price){
    const qty = ++this.val;
 if(this.val<6){
      const product_amt = (+this.item.price * +qty) ;
      this.item.price = product_amt.toString();
      console.log(this.item.price);
      Object.assign(this.data, {"price": this.item.price});
      Object.assign(this.data, {"qty": qty});
      this.valueChanges.emit(this.data);
    } else{
      this.val = 5;
      alert('maximum 5 allowed');
    }
  }
  decreaseNumber( price){
    const qty = --this.val;
    if (this.val>= 1 && this.val <=5) {
      const product_amt = (+this.item.price * +qty) ;
      this.item.price = product_amt.toString();
      console.log(this.item.price);
      Object.assign(this.data, {"price": this.item.price});
      Object.assign(this.data, {"qty": qty});
      this.valueChanges.emit(this.data);
    } else {
      this.val = 1;
      alert('minimum 1 required');
    }

  }
  sendData(){
    Object.assign(this.data, {"price": this.item.price});
    Object.assign(this.data, {"qty": this.qty});
    this.valueChanges.emit(this.data);
  }
  onSelectCategory(value){
    console.log(value);
    const qty = value;
    const price = this.item.price;
   // this.item.price = (qty *  price );

    //this.item.price = this.product_amt;
  }
   totalCost(amt ){
  //console.log(this.total_cart_amt);
    }
}
