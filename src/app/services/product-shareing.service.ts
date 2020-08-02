import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductShareingService {
  sharedId: string;

  private itemId = new BehaviorSubject(this.sharedId);
  currentItemId = this.itemId.asObservable();
  private buyId = new BehaviorSubject(this.sharedId);
  currentBuyId = this.buyId.asObservable();

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }
    changeItemId(id: string){
      console.log(id);
      this.itemId.next(id);
    }
    changeBuyId(id: string){
      this.itemId.next(id);
    }
}
