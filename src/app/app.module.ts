import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule,StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap';
import { AppRoutes } from './app.routing';
import {environment} from 'src/environments/environment';
import { HeaderComponent } from './index/header/header.component';
import { BannerComponent } from './content/banner/banner.component';
import { ContentComponent } from './content/content.component';
import { CartService } from './services/cart.service';

import { SharedModule } from './shared/shared.module';
import { ProductService } from './services/product.service';
import { AuthService } from './auth/auth.service';
import { BillingService } from './order/billing.service';


/* to load and set en.json as the default application language */
@NgModule({
	declarations: [ 
		AppComponent,
		 HeaderComponent, 
		 BannerComponent,
		 ContentComponent,
		],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireStorageModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		CarouselModule.forRoot()
	],
	providers: [ CartService, ProductService, BillingService, AuthService, { provide: StorageBucket, useValue: 'gs://shopingzone-77ff1.appspot.com/' }
	],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
