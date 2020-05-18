import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public cartItems: number;

  constructor( private cartService: CartService,
                private route: Router
    ) { }

  addToCart(){
    this.cartItems++;
    this.cartService.cartIncrement(this.cartItems);
  }
  onBuy(){
    this.route.navigate['cart'];
  }

  ngOnInit() {
    this.cartService.currentItemValue.subscribe(cartItems => this.cartItems = cartItems);
  }

}
