import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Admin/product.model';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/cart/cart.model';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewInit {
  public balence: number;
  products_amt: any;
  products_total_amt: any;
  cartBadge: number;
  product = [];
  items: Cart[];
  mode:string;
  qty = 1;
  id: string;
  userId: string;
  quantity:number = 1;
  product_: any = {};
  proId:string;
  shipping_charge = 50;
  //shipingChrg:number;
  total_cart_amt: number;
  product_total_amt;
  product1_price:number;
  //text_box:number;
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
              private renderer: Renderer2, 
              private elRef: ElementRef,
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
        this.productsTotalAmt(item.price);  
      }
     });
           this.route.paramMap.subscribe((paramMap: ParamMap) =>{
          if(paramMap.has('itemId')){
            this.id = paramMap.get("itemId");
            this.itemService.getItem(this.id).subscribe(action =>{
              this.proId = action.payload.id;
              this.product_ = action.payload.data();
              //this.product_ = action.payload.data();
            })
          }
      });
  }

  ngAfterViewInit(){
  }
  productsTotalAmt(item_ptice){
    if (this.qty > 1 ) {
      const cost = this.product1_price;
      console.log('qty>1 products amt '+cost);
      this.products_total_amt = cost;
      this.totalCartAmt(this.products_total_amt);
    } else {
      const cost = (item_ptice * this.qty);
      console.log(' qty = 1 products amt '+cost);
      this.products_total_amt = cost;
      this.totalCartAmt(this.products_total_amt);
    }

    
  }
  totalCartAmt( cart_total ){
    const cost = (this.shipping_charge  + cart_total );
    console.log('total_cartCost '+ cost);
    
  }
   getItemDetails(data){
     this.product1_price = data.price;
     this.qty = data.qty;
     console.log(data);
     
     this.productsTotalAmt(this.product1_price);
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
