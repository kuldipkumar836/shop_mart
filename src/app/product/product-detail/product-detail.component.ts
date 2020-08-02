import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Admin/product.model';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public cartItems: number;
  id: string;
  form: FormGroup;
  items: Product[];

  constructor( private cartService: CartService,
                private itemService: ProductService,
                private itemId: ProductShareingService,
                private router: Router
    ) { 
      this.form = new FormGroup({
        productId: new FormControl(null, { validators:[]})
       });
    }

  addToCart(){
    console.log(this.cartItems);
    this.cartItems++;
    this.cartService.cartIncrement(this.cartItems);
    this.form.patchValue({ productId: this.id});
    this.form.get("productId").updateValueAndValidity();
    this.cartService.saveInCart(this.form.value).then();

  }
  onBuy(){
    this.itemId.changeBuyId(this.id)
    this.router.navigateByUrl('/cart/cartItem');
  }
  product_detail(){
    this.router.navigateByUrl('/product/itemInfo');
  }

  ngOnInit() {
    this.cartService.currentItemValue.subscribe(cartItems => this.cartItems = cartItems);
    //this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
    this.itemId.currentItemId.subscribe(productid => this.id = productid);
    console.log(this.id);
    this.itemService.getItem(this.id).subscribe(a=>{
      this.items = a.map(item=>{
        return {
          id: item.payload.doc.id,
            ...item.payload.doc.data()
        }as Product
      })
      console.log(this.items);
      
    })
  }

}
