import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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
  constructor( public itemService: ProductService,
                public route: ActivatedRoute,
                public router: Router
              ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators:[]}),
      price: new FormControl(null, { validators:[]}),
      quantity: new FormControl(null, { validators:[]}),
     // image: new FormControl(null, { validators:[]}),
      specification: new FormControl(null, { validators:[]}),
      description: new FormControl(null, { validators:[]}),
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("itemId")) {
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
    });
  }

  onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
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
    const data = Object.assign({}, this.form.value); 
    if (this.mode === 'addItem') {
      this.itemService.saveItem(data).subscribe( );
    }
    else{
      this.itemService.updateItem(this.itemId, data ).subscribe(res =>{
        this.router.navigate(["/admin/itemList"]);
      } );
    
    }
   this.form.reset();
  }

}
