import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './index/header/header.component';
import { AuthGuard } from './shared/auth.guard';


export const AppRoutes: Routes = [
    { path: '', component: ContentComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'admin', loadChildren: './Admin/admin.module#AdminModule' },
    { path: 'product', loadChildren: './product/product.module#ProductModule' },
    { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
    { path: 'checkout', loadChildren: './order/order.module#OrderModule' },
];
