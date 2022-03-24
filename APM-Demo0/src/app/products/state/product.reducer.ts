import { ActionReducer, createAction, createFeatureSelector, createReducer, createSelector, MemoizedSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  showProductCode: true
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);

export const productReducer = createReducer(
  initialState,
  on(createAction('[Product] Toggle product code'), (state: ProductState): ProductState => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
);
