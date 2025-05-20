import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { selectProductById } from '../../store/selectors/product.selectors';
import { addToCart } from 'src/app/store/actions/product.actions';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss'],
})
export class ProductShowcaseComponent implements OnInit {
  product$!: Observable<Product | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.store.select(selectProductById(productId)).pipe(
      filter(product => !!product) // Ensure the product exists before emitting
    );
  }

  addToCart(product: Product) {
      this.store.dispatch(addToCart({ product }));}
}
