import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Admin/product.model';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  public quantity: number;
  public balence: number;
  public cartBadge: number;
  id: string;
  items: Product[]
  constructor( 
              private itemService: ProductService,
              private itemId: ProductShareingService,
              private cartService: CartService,
              private router: Router,
                ) {
               }

  ngOnInit() {
    this.cartService.currentItemQuantity.subscribe(quantity => this.quantity = quantity);
    this.cartService.currentItemPrice.subscribe(balence => this.balence = balence);
    this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
    this.itemId.currentItemId.subscribe(productid => this.id = productid);
    console.log(this.id);
    this.itemService.getItems().subscribe(a=>{
      this.items = a.map(item=>{
        return {
          id: item.payload.doc.id,
            ...item.payload.doc.data()
        }as Product
      })
    })
  }
  increaseItem(){
    this.quantity++;
    this.cartService.totalAmount(this.quantity);
  }
  decreaseItem(){

    if( this.quantity >=2){
      this.quantity--;
    }
    this.cartService.totalAmount(this.quantity);
  }
  removeItemFormCart(){
    if(this.cartBadge >=1){
      this.cartBadge--;
    }
  
  //  this.cartService.removeFromCart()
    this.cartService.cartDecrement(this.cartBadge);
  }
  checkout(){
    this.router.navigateByUrl('/checkout/order');
  }
  product_detail(){
    this.router.navigateByUrl('/product/itemInfo');

  }


}
