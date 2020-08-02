import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
 export interface Category{
    value: string;
    name: string;
  }

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  imagePreview: string;
  isLoading: boolean;
  form: FormGroup;
  items: Product;
  file: File;
  itemId: string;
  mode: string;
    uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor( public itemService: ProductService,
                public route: ActivatedRoute,
                public router: Router,
                private storage:AngularFireStorage
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators:[]}),
      price: new FormControl(null, { validators:[]}),
      quantity: new FormControl(null, { validators:[]}),
      imageUrl: new FormControl(null, { validators:[]}),
      specification: new FormControl(null, { validators:[]}),
      description: new FormControl(null, { validators:[]}),
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {});
      /*if (paramMap.has("itemId")) {
        this.mode = "editItem";
        this.itemId = paramMap.get("itemId");
        this.itemService.getItem(this.itemId).subscribe((itemData:Product[]) => {
          this.items = {
            name: itemData[0].name,
            price: itemData[0].price,
            quantity: itemData[0].quantity,
            specification: itemData[0].specification,
            description: itemData[0].description,
          };
          // this.isLoading = true;
           this.form.setValue({
            name: this.items.name,
            price: this.items.price,
            quantity: this.items.quantity,
            specification: this.items.specification,
            description: this.items.description
          });
        });
      } else {
        this.mode = "addItem";
        this.itemId = null;
      }
    });*/
  }

  onImagePicked(event) {
        const path = `products/${Math.random().toString(36).substring(2)}`;
    const file = event.target.files[0];
    const filePath = path;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )

     )
    .subscribe()
  }
    category: string;
    categories: Category[] = [
      {value: 'clothe', name: 'Clothe'},
      {value: 'mobiles', name: 'Mobiles'},
      {value: 'grossory', name: 'Grossry'}
    ];

  cancel(){
    this.form.reset();
  }

  productSave(){
    if(this.form.invalid){
      return;
    }
    this.downloadURL.subscribe(data =>{
      this.imagePreview = data;
      console.log(this.imagePreview);
      
    });
    this.form.patchValue({imageUrl: this.imagePreview});
    this.form.get('imageUrl').updateValueAndValidity();
    const data = Object.assign({}, this.form.value); 
    console.log(data);
    
     this.itemService.saveItem(data).then(data =>{
      });
    /*if (this.mode === 'addItem') {
     
    }
    else{
      this.itemService.updateItem(this.itemId, data ).subscribe(res =>{
        this.router.navigate(["/admin/itemList"]);
      } );
    
    }*/
   this.form.reset();
  }

}
