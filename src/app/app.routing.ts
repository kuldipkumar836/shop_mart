import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';


export const AppRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'admin', loadChildren: './Admin/admin.module#AdminModule' },
    { path: 'product', loadChildren: './product/product.module#ProductModule' },
    { path: '', loadChildren: './cart/cart.module#CartModule' },
    { path: 'checkout', loadChildren: './order/order.module#OrderModule' },
];
