import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../Admin/product.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/cart/cart.model';
import { ProductShareingService } from '../services/product-shareing.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
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
