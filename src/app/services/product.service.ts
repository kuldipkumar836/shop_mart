import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../Admin/product.model';
import { AngularFirestore, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  category: string;
  constructor( private afs:AngularFirestore,
                private router: Router
    ) { }
  setCategory(categoryName: string){
    this.category = categoryName;
  }
  saveItem(itemData: Product){
    return this.afs.collection(`products/${this.category}/product`).add(itemData);
};

  getItems(){
       return this.afs.collection('products').snapshotChanges();
     }
 
  
  deleteItem(itemId: string){
    return this.afs.doc(`products/${itemId}`).delete();
  }
   getItem(itemId: string){
       return this.afs.doc('products/' + itemId).snapshotChanges();
     }

  updateItem(itemId: string, itemData: Product){
    return this.afs.doc(`products/${itemId}`).update(itemData);
  }
}

