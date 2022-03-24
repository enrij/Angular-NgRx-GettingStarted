import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
  '[Product] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product] Set current product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear current product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize current product'
);

export const loadProducts = createAction(
  '[Product] Load products'
);

export const loadProductsSuccess = createAction(
  '[Product] Load products success 👍🏻',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product] Load products failure 👎🏻',
  props<{ error: string }>()
);
