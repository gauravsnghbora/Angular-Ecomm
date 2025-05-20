import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { Product } from '../../models/product.model';

// Create a feature selector for the product state
const selectProductState = createFeatureSelector<ProductState>('products');

// Selector to get all products
export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

// Selector to get products in the cart
export const selectCartProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.cart
);

// Selector to get loading status
export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

// Selector to get error if any
export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

// Selector to get filtered products by search term, category, color, discount percent, and price
export const selectFilteredProducts = (
  searchTerm: string,
  category: string,
  color: string,
  discountPercent: number | null,
  maxPrice: number | null
) => createSelector(
  selectAllProducts,
  (products: Product[]) => {
    return products.filter((product: Product) => {
      const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category ? product.topLevelCategory === category : true;
      const matchesColor = color ? product.color.toLowerCase().includes(color.toLowerCase()) : true;
      const matchesDiscount = discountPercent !== null ? product.discountPercent >= discountPercent : true;
      const matchesPrice = maxPrice !== null ? product.price <= maxPrice : true;

      return matchesSearchTerm && matchesCategory && matchesColor && matchesDiscount && matchesPrice;
    });
  }
);

// Selector to get a product by ID
export const selectProductById = (productId: number) => createSelector(
  selectAllProducts,
  (products: Product[]) => {
    console.log(products); // Debugger added to inspect the value of productId and products
    return products.find((product: Product) => product.id == productId);
  }
);