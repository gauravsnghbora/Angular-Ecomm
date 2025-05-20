import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductShowcaseComponent } from './components/product-showcase/product-showcase.component';

const routes: Routes = [
 { path: '', component: HomeComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'product/:id', component: ProductShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
