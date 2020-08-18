import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { BillingService } from 'src/app/order/billing.service';
import { Cart } from 'src/app/cart/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.css']
})
export class ItemCheckoutComponent implements OnInit {
  form: FormGroup;
 state: string;
 userid: string;
 district: string;
 items: Cart[];
 districts: any[] = [];


  constructor( 
            private bill_Servive: BillingService,
            private cartService: CartService,
            private authService: AuthService,
   ) {
    
   }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators:[]}),
      mobileNo: new FormControl(null, {validators:[]}),
      pincode: new FormControl(null, {validators:[]}),
      galli: new FormControl(null, {validators:[]}),
      landmark: new FormControl(null, {validators:[]}),
    });
    this.userid = this.authService.getUserId();
    //get Product which buy
           this.cartService.getCartProduct(this.userid).subscribe(act =>{
               this.items = act.map(item=>{
      return {
                id: item.payload.doc.id,
          ...item.payload.doc.data()
      } as Cart
    });
    });
  }
  paymentMethode(){
    console.log(this.form.value);
  }
  addressinfo(){
    const data = Object.assign({}, this.form.value);
    this.bill_Servive.saveOrder(data).then();
    this.form.reset();
  }
  states: any[] = [
    {
      stateName: 'dl',
      districts: [
        { districtName: 'Real Madrid' },
        { districtName: 'Real Madrid1' },
        { districtName: 'Real Madrid2' },
        { districtName: 'Real Madrid3' },
      ]
    },
    {
      stateName: 'MP',
      districts: [
        { districtName: 'Real Madrid' },
        { districtName: 'Real Madrid1' },
        { districtName: 'Real Madrid2' },
        { districtName: 'Real Madrid3' },
      ]
    },
    {
      stateName: 'Up',
      districts: [
        { districtName: 'Real Madrid' },
        { districtName: 'Real Madrid1' },
        { districtName: 'Real Madrid2' },
        { districtName: 'Real Madrid3' },
      ]
    }
  ];
        
  addressInfo(form: NgForm){
    console.log(form.value);
  }
  cardDeatail(form: NgForm){
    console.log(form.value);
  }

}
