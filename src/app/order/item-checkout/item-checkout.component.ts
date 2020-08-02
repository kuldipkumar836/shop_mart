import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.css']
})
export class ItemCheckoutComponent implements OnInit {
  form: FormGroup;
 state: string;
 district: string;
 districts: any[] = [];


  constructor(  ) {
    
   }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators:[]}),
      mobileNo: new FormControl(null, {validators:[]}),
      pincode: new FormControl(null, {validators:[]}),
      galli: new FormControl(null, {validators:[]}),
      landmark: new FormControl(null, {validators:[]}),
    });
  }
  paymentMethode(){
    console.log(this.form.value);

  }
  addressinfo(){
    console.log(this.form.value);
    
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
