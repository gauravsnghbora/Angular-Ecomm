import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts, addToCart, updateFilterCriteria } from '../../store/actions/product.actions';
import { Product } from '../../models/product.model';
import { selectFeaturedProducts, selectFilterCriteria, selectFilteredProducts } from '../../store/selectors/product.selectors';
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
  // filterCriteria!: FilterCriteria; 


  category: string = '';
  color: string = '';
  discountPercent: number | null = null;
  maxPrice: number | null = null;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectFilteredProducts());
    this.store.select(selectFilterCriteria).subscribe((filterCriteria: FilterCriteria) => {
      this.category = filterCriteria.category;
      this.color = filterCriteria.color;
      this.discountPercent = filterCriteria.discountPercent;
      this.maxPrice = filterCriteria.maxPrice;}
      );
    // this.products$.subscribe((results: Product[])=> this.products = results);
  }

  onSearch() {
    const filterCriteria: FilterCriteria = {
      category: this.category,
      color: this.color,
      discountPercent: this.discountPercent,
      maxPrice: this.maxPrice
    };
    this.store.dispatch(updateFilterCriteria({filterCriteria}));
    this.products$ = this.store.select(
      selectFilteredProducts(
      )
    );
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}