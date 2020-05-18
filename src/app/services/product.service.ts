import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../Admin/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BACKEND_URL = 'http://localhost:5001/shopingzone-77ff1/us-central1/app/'
  constructor( private http: HttpClient,
                private router: Router
    ) { }

  saveItem(itemData: Product){
    console.log(itemData);
    return this.http
      .post<{ post: Product }>(
        this.BACKEND_URL + 'api/create',
        itemData
      )};
  getItems(){
       return this.http.get<{}>(this.BACKEND_URL + 'api/read');
     }
  getItem(itemId: string){
       return this.http.get<{}>(this.BACKEND_URL + 'api/read/' + itemId);
     }
  
  deleteItem(itemId: string){
    return this.http.delete(this.BACKEND_URL + 'api/delete/' + itemId);
  }

  updateItem(itemId: string, itemData: Product){
    return this.http.put<{}>(this.BACKEND_URL + 'api/update/' + itemId, itemData );
  }
}

