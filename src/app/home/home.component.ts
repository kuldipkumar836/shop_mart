import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/cart/cart.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductShareingService } from 'src/app/services/product-shareing.service';
import { Product } from 'src/app/Admin/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Product[];
  item_val = [];
  isLoading: boolean;
    cartBadge: number;
    userId:string;
  constructor( 
    private itemService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private shareId: ProductShareingService,
    private router: Router
    ) { }

  ngOnInit() {
        //this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
        this.userId = this.authService.getUserId();
              this.cartService.getCartProduct(this.userId).subscribe(act =>{
               this.item_val = act.map(item=>{
      return {
                id: item.payload.doc.id,
          ...item.payload.doc.data()
      } as Cart
    });
    this.cartService.cartIncrement(this.item_val.length)
              });
    this.itemService.getItems().subscribe(a=>{
    this.items = a.map(item=>{
      return {
        id: item.payload.doc.id,
          ...item.payload.doc.data()
      }as Product
    })
  })
  }
  product_detail(id: string){
    this.shareId.changeItemId(id);
    this.router.navigateByUrl(`/product/itemInfo/${id}`);
  }
}

