import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.model';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: Product[];
  isLoading: boolean;
   constructor( private itemServise: ProductService) { }

  ngOnInit() {
      this.isLoading = true;
    this.itemServise.getItems().subscribe(a=>{
    this.items = a.map(item=>{
      return {
        id: item.payload.doc.id,
          ...item.payload.doc.data()
      }as Product
    })
    this.isLoading = false;
  })
  
  }
  updateItem(itemId: string){
  
  }
  onDelete(itemId: string){
    this.itemServise.deleteItem(itemId).then(() => {
      this.itemServise.getItems().subscribe(a=>{
    this.items = a.map(item=>{
      return {
        id: item.payload.doc.id,
          ...item.payload.doc.data()
      }as Product
    })
  });
    })
  }
}
