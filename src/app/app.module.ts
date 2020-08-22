import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule,StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutes } from './app.routing';
import {environment} from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import { ContentComponent } from './home/content/content.component';
import { CartService } from './services/cart.service';

import { SharedModule } from './shared/shared.module';
import { ProductService } from './services/product.service';
import { AuthService } from './auth/auth.service';
import { BillingService } from './order/billing.service';
import { HomeComponent } from './home/home.component';


/* to load and set en.json as the default application language */
@NgModule({
	declarations: [ 
		AppComponent,
		 HeaderComponent, 
		 BannerComponent,
		 ContentComponent,
		 HomeComponent,
		],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireStorageModule,
		//LoadingBarRouterModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		CarouselModule.forRoot()
	],
	providers: [ CartService, ProductService, BillingService, AuthService, { provide: StorageBucket, useValue: 'gs://shopingzone-77ff1.appspot.com/' }
	],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
