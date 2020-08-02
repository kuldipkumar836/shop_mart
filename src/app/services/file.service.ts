import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor( private afs:AngularFirestore ) { }

 getImages(){
       return this.afs.collection('banners').snapshotChanges();
     }
  
}

