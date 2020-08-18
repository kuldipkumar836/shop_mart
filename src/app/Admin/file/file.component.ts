import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface Banner{
  id: string;
  imageUrl: string;
}
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  url: string;
  banners: Banner[];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor( private storage:AngularFireStorage,
              private afs:AngularFirestore
          ) 
    { }
  ngOnInit() {
    this.afs.collection('banners').snapshotChanges().subscribe(a =>{
      this.banners = a.map(item=>{
        return {
          id: item.payload.doc.id,
            ...item.payload.doc.data()
        }as Banner
      })
    })
    this.form = new FormGroup({
     imageUrl: new FormControl(null, { validators:[]})
    });
  }
  onSubmit(){
    this.downloadURL.subscribe(data => {
      this.imagePreview = data;
    });
  //  this.downloadURL.subscribe(data =>{
   //   this.url = data;
   // });
    console.log(this.imagePreview);
    this.form.patchValue({ imageUrl: this.imagePreview });
    this.form.get('imageUrl').updateValueAndValidity();
    //this.form.patchValue({ imageUrl: this.url });
    //this.form.get("imageUrl").updateValueAndValidity();
        const data = Object.assign({}, this.form.value); 
        console.log(data);
      this.afs.collection('banners').add(data);
  }
  uploadFile(){    

  }
  updateFile(){

  }
  deleteFile(){

  }
  filePicker(event){
        const path = `banners/${Math.random().toString(36).substring(2)}`;
        const file = event.target.files[0];
        const filePath = path;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
    
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = fileRef.getDownloadURL())
    
        )
          .subscribe()
  }

}
