import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.model';
import * as ProductActions from '../actions/product.actions';

// Define the state structure
export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: Product[]; // This will hold the products added to the cart
}

// Initial state
export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  cart: [],
};

// Create the reducer
export const productReducer = createReducer(
  initialState,
  
  // Handle loading products action
  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Handle successful load of products
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  // Handle loading products failure
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle adding a product to the cart
  on(ProductActions.addToCart, (state, { product }) => {
    const cartProducts = [...state.cart, product]; // Add the new product to the cart
    return { ...state, cart: cartProducts };
  }),

  // Handle removing a product from the cart
  on(ProductActions.removeFromCart, (state, { productId }) => {
    const cartProducts = state.cart.filter(product => product.id !== productId); // Filter out the product to remove
    return { ...state, cart: cartProducts };
  })
);