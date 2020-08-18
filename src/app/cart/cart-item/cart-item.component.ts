import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Admin/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/cart/cart.model';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, AfterViewInit {
 // public quantity: number;
  public balence: number;
  cartBadge: number;
  product = [];
  items: Cart[];
  mode:string;
  id: string;
  userId: string;
  quantity:number = 1;
  product_: any = {};
  proId:string;
  shipingChrg:number;
  total1_cart_amt:number;
  product1_total_amt:number;
  product1_price:number;
  text_box:number;
    // @ViewChild('shipping_charge') shipping_charge: ElementRef;
   //  @ViewChild('product_price') product_price: ElementRef;
   //  @ViewChild('textbox') textbox: ElementRef;
   //  @ViewChild('product_total_amt') product_total_amt: ElementRef;
    // @ViewChild('total_cart_amt') total_cart_amt: ElementRef;
  constructor( 
              private itemService: ProductService,
              private itemId: ProductShareingService,
              private cartService: CartService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
                ) {
               }

  ngOnInit() {
    //this.cartService.currentItemQuantity.subscribe(quantity => this.quantity = quantity);
   // this.cartService.currentItemPrice.subscribe(balence => this.balence = balence);
   this.userId = this.authService.getUserId();
    this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
          this.cartService.getCartProduct(this.userId).subscribe(act =>{
               this.items = act.map(item=>{
      return {
                id: item.payload.doc.id,
          ...item.payload.doc.data()
      } as Cart
    });
    this.cartService.cartIncrement(this.items.length);
      for (let item of this.items) {
        console.log(item.productId);  
      }
     });
           this.route.paramMap.subscribe((paramMap: ParamMap) =>{
          if(paramMap.has('itemId')){
            this.id = paramMap.get("itemId");
            this.itemService.getItem(this.id).subscribe(action =>{
              this.product_ = action.payload.data();
              this.proId = action.payload.id;
            })
          }
      });
  }
    ngAfterViewInit() {
    //this.shipingChrg = this.shipping_charge.nativeElement.innerHTML;
    //this.shipping_charge.nativeElement.innerHTML = increaseItem();
    //this.text_box = this.textbox.nativeElement.innerHTML;
   // this.shipingChrg = this.shipping_charge.nativeElement.innerHTML;
   // this.total1_cart_amt = this.total1_cart_amt.nativeElement.innerHTML;
   // console.log(this.product1_price);
  //this.product_price.nativeElement.innerHTML.increaseItem();
    //this.quantity = this.textbox.nativeElement.innerHTML;
   // console.log(this.shipingChrg);
    //console.log(this.text_box);
   // this.shipping_charge.nativeElement.innerHTML = "I am changed by ElementRef & ViewChild";
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
  removeItemFormCart(id: string){
    if(this.cartBadge >=1){
      this.cartBadge--;
    }
      this.cartService.deleteCartProduct(this.userId, id).then()
  
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
