import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
  '[Product] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product] Set current product',
  props<{ currentProductId: number }>()
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
  '[Product] Load products ✔',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product] Load products ❌',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update product ✔',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product] Update product ❌',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] Create product ✔',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create product ❌',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete product ✔',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete product ❌',
  props<{ error: string }>()
);
