import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  public quantity: number;
  public balence: number;
  public cartBadge: number;

  constructor( private iconRegistry: MatIconRegistry, 
               private sanitizer: DomSanitizer,
               private cartService: CartService
                ) {
                  iconRegistry.addSvgIcon(
                    'add-24px',
                    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-24px.svg'));
                  iconRegistry.addSvgIcon(
                    'remove-24px',
                    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/remove-24px.svg')); 
               }

  ngOnInit() {
    this.cartService.currentItemQuantity.subscribe(quantity => this.quantity = quantity);
    this.cartService.currentItemPrice.subscribe(balence => this.balence = balence);
    this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
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
    this.cartService.cartDecrement(this.cartBadge);
  }

  checkout(){
    
  }


}
