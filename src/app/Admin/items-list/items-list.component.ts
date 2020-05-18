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
    this.itemServise.getItems().subscribe((item: Product[]) =>
    {
      this.items = item;
      this.isLoading = false;
    });
  }
  onDelete(itemId: string){
    this.itemServise.deleteItem(itemId).subscribe(() => {
      this.itemServise.getItems().subscribe((item: Product[]) =>
      {
        this.items = item;
       
      });
    })
  }


}
