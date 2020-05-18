import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ItemCheckoutComponent } from './order/item-checkout/item-checkout.component';


export const AppRoutes: Routes = [
    { path: '', component: ContentComponent},
    { path: 'checkout', component: ItemCheckoutComponent },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'admin', loadChildren: './Admin/admin.module#AdminModule' },
    { path: 'product', loadChildren: './product/product.module#ProductModule' },
    { path: 'cart', loadChildren: './cart/cart.module#CartModule' },

];
