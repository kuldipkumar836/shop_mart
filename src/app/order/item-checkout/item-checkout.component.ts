import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-item-checkout',
  templateUrl: './item-checkout.component.html',
  styleUrls: ['./item-checkout.component.css']
})
export class ItemCheckoutComponent implements OnInit {

 state: string;
 district: string;
 districts: any[] = [];


  constructor(  ) { }

  ngOnInit() {
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
