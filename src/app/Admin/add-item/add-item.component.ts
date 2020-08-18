import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
export interface Category {
  value: string;
  name: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  imageUrl: string;
  isLoading: boolean;
  form: FormGroup;
  items: Product;
  itemId: string;
  mode: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(public itemService: ProductService,
    public route: ActivatedRoute,
    public router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [] }),
      price: new FormControl(null, { validators: [] }),
      quantity: new FormControl(null, { validators: [] }),
      imageUrl: new FormControl(null, { validators: [] }),
      specification: new FormControl(null, { validators: [] }),
      description: new FormControl(null, { validators: [] }),
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("itemId")) {
        this.mode = "editItem";
        this.itemId = paramMap.get("itemId");
        this.itemService.getItem(this.itemId).subscribe((data) => {
           const itemData = data.payload.data();
           const id = data.payload.id;
           this.items = {
             name: itemData['name'],
             price: itemData['price'],
             quantity: itemData['quantity'],
             imageUrl: itemData['imageUrl'],
             specification: itemData['specification'],
             description: itemData['description'],
           };
           //console.log(this.items);
           // this.isLoading = true;
            this.form.patchValue({
             name: this.items.name,
             price: this.items.price,
             quantity: this.items.quantity,
             imageUrl: this.items.imageUrl,
             specification: this.items.specification,
             description: this.items.description
           });
         });
      }
      else {
        this.mode = "addItem";
        this.itemId = null;
      }
    });
  }
    // select Category Array
    onSelectCategory(event){
      const value = event.target.value;
      this.itemService.setCategory(value);
    }
    categories = [
      {id: 1, name: "Mobile"},
      {id: 2, name: "Cloth"},
      {id: 3, name: "Fashion"},
      {id: 4, name: "Electronic"},
    ];
  onImagePicked(event) {
     const path = `products/${Math.random().toString(36).substring(2)}`;
     const file = event.target.files[0];
         const reader = new FileReader();
            reader.onload = () => {
          this.imageUrl = reader.result as string;
                   };
    reader.readAsDataURL(file);
     //filePath = path;
     const fileRef = this.storage.ref(path);
     const task = this.storage.upload(path, file);
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
       finalize(() => this.downloadURL = fileRef.getDownloadURL())
     )
       .subscribe()
  }
  cancel() {
    this.form.reset();
    this.imageUrl=null;
  }
  productSave() {
    if (this.form.invalid) {
      return;
    }
    const data = Object.assign({}, this.form.value);
    console.log(data);
    this.downloadURL.subscribe(data => {
      this.imageUrl = data;
     this.form.patchValue({ imageUrl: this.imageUrl });
      this.form.get('imageUrl').updateValueAndValidity();      
    });
     
    if (this.mode === 'addItem') {
 
      this.itemService.saveItem(data).then(data => {
      });
      this.imageUrl = null;
    }
    else{
      this.form.patchValue({ imageUrl: this.imageUrl });
      this.form.get('imageUrl').updateValueAndValidity();
       this.itemService.updateItem(this.itemId, data ).then(res =>{
         this.router.navigate(["/admin/itemList"]);
       });
     }
    // this.imageUrl=null;
    this.form.reset();
  }

}
