import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction(
  '[Product Page] Toggle product code'
);

export const setCurrentProduct = createAction(
  '[Product Page] Set current product',
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear current product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize current product'
);

export const loadProducts = createAction(
  '[Product Page] Load products'
);

export const updateProduct = createAction(
  '[Product Page] Update product',
  props<{ product: Product }>()
);

export const createProduct = createAction(
  '[Product Page] Create product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete product',
  props<{ productId: number }>()
);
