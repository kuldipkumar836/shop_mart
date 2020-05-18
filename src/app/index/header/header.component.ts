import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cartBadge: number ;
    userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor( private authService: AuthService,
     public cartService: CartService,
               iconRegistry: MatIconRegistry, 
               sanitizer: DomSanitizer
    ) {
      iconRegistry.addSvgIcon(
        'shopping_cart',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shopping_cart.svg'));
        
  }

  ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
       this.cartService.currentItemValue.subscribe(cartBadge => this.cartBadge = cartBadge);
  }

}
