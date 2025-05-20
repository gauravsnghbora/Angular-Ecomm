import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { removeFromCart } from '../../store/actions/product.actions';
import { selectCartProducts } from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartProducts: Product[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total', 'remove'];

  constructor(private store: Store) {
    
    this.store.select(selectCartProducts).subscribe(products => {
      this.cartProducts = products;
    });
  }

  removeProduct(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  getTotalCost(): number {
    return this.cartProducts.reduce((total, product) => total + product.quantity * product.price, 0);
  }
}