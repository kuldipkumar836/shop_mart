import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../Admin/product.model';
import { Router } from '@angular/router';
import { ProductShareingService } from '../services/product-shareing.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items: Product[];
  isLoading: boolean;
  constructor( private itemServise: ProductService,
    private shareId: ProductShareingService,
    private router: Router
    ) { }

  ngOnInit() {
    this.itemServise.getItems().subscribe(a=>{
    this.items = a.map(item=>{
      return {
        id: item.payload.doc.id,
          ...item.payload.doc.data()
      }as Product
    })
  })
  }
  product_detail(id: string){
    console.log(id);
    this.shareId.changeItemId(id);
    this.router.navigateByUrl(`/product/itemInfo/:${id}`);
  }

}
