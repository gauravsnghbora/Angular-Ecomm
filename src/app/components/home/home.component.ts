import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadProducts, addToCart, updateFilterCriteria, updateFilteredProducts } from '../../store/actions/product.actions';
import { Product } from '../../models/product.model';
import { selectFeaturedProducts, selectFilteredProducts } from '../../store/selectors/product.selectors';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { FilterCriteria } from 'src/app/models/filter-criteria.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$!: Observable<Product[]>; 
  products: Product[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  selectedColor: string = '';
  discountPercent: number | null = null;
  maxPrice: number | null = null;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectFeaturedProducts);
    this.products$.subscribe((results: Product[])=> this.products = results);
  }

  onSearch() {
    const filterCriteria: FilterCriteria = {
      category: this.selectedCategory,
      color: this.selectedColor,
      discountPercent: this.discountPercent,
      maxPrice: this.maxPrice
    };
    this.store.dispatch(updateFilterCriteria({filterCriteria}));
    this.products$ = this.store.select(
      selectFilteredProducts(
      )
    );
  }

  updateFilteredList() {
    this.store.dispatch(updateFilteredProducts({searchText: this.searchText}));
    this.products$ = this.store.select(selectFilteredProducts());
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