import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../Admin/product.model';
import { AngularFirestore, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor( private afs:AngularFirestore,
                private router: Router
    ) { }
  saveItem(itemData: Product){
    return this.afs.collection('products').add(itemData);
};

  getItems(){
       return this.afs.collection('products').snapshotChanges();
     }
 
  
  deleteItem(itemId: string){
    return this.afs.doc(`products/${itemId}`).delete();
  }
   getItem(itemId: string){
       return this.afs.collection(`products/${itemId}`).snapshotChanges();
     }

 /* updateItem(itemId: string, itemData: Product){
    return this.afs.doc(`products/${itemId}`).update(itemData);
  }*/
}

