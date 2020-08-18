import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Admin/product.model';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Cart } from 'src/app/cart/cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public cartItems: number;
  id: string;
  productId: string;
  userId: string;
  form: FormGroup;
  items = [];
  data:any = {};
  constructor( private cartService: CartService,
                private itemService: ProductService,
                private authService: AuthService,
                private itemId: ProductShareingService,
                private route: ActivatedRoute,
                private router: Router
    ) { 
      this.form = new FormGroup({
        productId: new FormControl(null, { validators:[]})
       });
    }
    ngOnInit() {
      this.cartService.currentItemValue.subscribe(cartItems => this.cartItems = cartItems);
      //this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
     // this.itemId.currentItemId.subscribe(productid => this.id = productid);
      //console.log(this.id);
      this.userId = this.authService.getUserId();
      this.route.paramMap.subscribe((paramMap: ParamMap) =>{
          if(paramMap.has('itemId')){
            this.id = paramMap.get("itemId");
            this.itemService.getItem(this.id).subscribe(action =>{
              this.data  = action.payload.data();
              const id = action.payload.id;
              const item_arr = Object.assign(this.data, {"id":id})
              this.items.push(item_arr); 
            })
          }
      });
    }

  addToCart(){
    this.cartService.getCartProduct(this.userId).subscribe(act =>{
            this.items = act.map(item =>{
              return {
                id: item.payload.doc.id,
      } as Cart
            })
            for( let product of this.items){
              if(product.id === this.id){
                this.router.navigate([`cart/cartItem/:${this.id}`]);
              }
              else
              {
                this.cartService.saveInCart(this.id,this.userId, this.data).then();
              }
            }
    })
    this.cartItems++;
    this.cartService.cartIncrement(this.cartItems);
  }
  onBuy(){
    this.itemId.changeBuyId(this.id)
    this.router.navigateByUrl(`/cart/cartItem/${this.id}`);
  }
  product_detail(){
    this.router.navigateByUrl('/product/itemInfo');
  }
}
