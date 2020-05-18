import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap';
import { AppRoutes } from './app.routing';
import { HeaderComponent } from './index/header/header.component';
import { BannerComponent } from './content/banner/banner.component';
import { ContentComponent } from './content/content.component';
import { CartService } from './services/cart.service';

import { SharedModule } from './shared/shared.module';
import { ItemCheckoutComponent } from './order/item-checkout/item-checkout.component';
import { ProductService } from './services/product.service';
import { AuthService } from './auth/auth.service';


/* to load and set en.json as the default application language */
@NgModule({
	declarations: [ AppComponent,
		 HeaderComponent, 
		 BannerComponent,
		 ContentComponent,
		 ItemCheckoutComponent,
		],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AngularFirestoreModule,
		AngularFireModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		CarouselModule.forRoot()
	],
	providers: [ CartService, ProductService, AuthService
	],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
