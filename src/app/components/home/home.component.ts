import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadProducts, addToCart } from '../../store/actions/product.actions';
import { Product } from '../../models/product.model';
import { selectAllProducts, selectFilteredProducts } from '../../store/selectors/product.selectors';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$!: Observable<Product[]>; 
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedColor: string = '';
  discountPercent: number | null = null;
  maxPrice: number | null = null;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectAllProducts);
    this.products$.subscribe((results: Product[])=> this.products = results);
  }

  onSearch() {
    this.products$ = this.store.select(
      selectFilteredProducts(
        this.searchTerm,
        this.selectedCategory,
        this.selectedColor,
        this.discountPercent,
        this.maxPrice
      )
    );
  }

  onCategoryChange(event: MatSelectChange) {
    this.selectedCategory = event.value;
    this.onSearch();
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}