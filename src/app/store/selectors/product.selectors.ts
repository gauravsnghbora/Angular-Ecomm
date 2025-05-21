import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { Product } from '../../models/product.model';
import { FilterCriteria } from '../../models/filter-criteria.model';

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

export const selectFeaturedProducts = createSelector(
  selectProductState,
  (state: ProductState) =>  state.products.filter((product: Product) => product.featured)
);

export const selectSearchFilteredProducts = createSelector(
  selectProductState,
  (state: ProductState) =>  state.filteredProducts && state.filteredProducts.length >0 ? state.filteredProducts : state.products.filter((product: Product) => product.featured)
);

export const selectFilterCriteria = createSelector(
  selectProductState,
  (state: ProductState) =>  state.filterCriteria
);

// Selector to get filtered products by search term, category, color, discount percent, and price
export const selectFilteredProducts = () => createSelector(
  selectProductState,
  selectSearchFilteredProducts,
  (state: ProductState, products: Product[]) => {
    if (!state.filterCriteria || 
      (!state.filterCriteria.category && 
       !state.filterCriteria.color && 
       (state.filterCriteria.discountPercent === null || state.filterCriteria.discountPercent === undefined) && 
       (state.filterCriteria.maxPrice === null || state.filterCriteria.maxPrice === undefined))) {
      return products; // Return all products if all filter criteria fields are empty
    }
    return products.filter((product: Product) => {
      const matchesCategory = state.filterCriteria && state.filterCriteria.category ? product.topLevelCategory === state.filterCriteria.category : true;
      const matchesColor = state.filterCriteria && state.filterCriteria.color ? product.color.toLowerCase().includes(state.filterCriteria.color.toLowerCase()) : true;
      const matchesDiscount = state.filterCriteria && state.filterCriteria.discountPercent !== null ? product.discountPercent >= state.filterCriteria.discountPercent : true;
      const matchesPrice = state.filterCriteria && state.filterCriteria.maxPrice !== null ? product.price <= state.filterCriteria.maxPrice : true;

      return matchesCategory && matchesColor && matchesDiscount && matchesPrice;
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