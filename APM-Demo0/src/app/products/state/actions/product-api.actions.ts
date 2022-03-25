import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductsSuccess = createAction(
  '[Product API] Load products ✔',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product API] Load products ❌',
  props<{ error: string }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update product ✔',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update product ❌',
  props<{ error: string }>()
);

export const createProductSuccess = createAction(
  '[Product API] Create product ✔',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product API] Create product ❌',
  props<{ error: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete product ✔',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete product ❌',
  props<{ error: string }>()
);
