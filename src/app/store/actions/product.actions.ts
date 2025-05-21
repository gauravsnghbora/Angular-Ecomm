import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { FilterCriteria } from '../../models/filter-criteria.model';

export const loadProducts = createAction('[Product List] Load Products');
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);

export const updateFilterCriteria = createAction(
  '[Filter] Update Filter Criteria',
  props<{ filterCriteria: FilterCriteria }>()
);

export const updateFilteredProducts = createAction(
  '[Product List] Update Filtered Products',
  props<{ searchText: string }>()
);

export const resetFilters = createAction(
  '[Filter] Reset Filter criteria'
);