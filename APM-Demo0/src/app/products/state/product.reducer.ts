import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

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
  on(ProductActions.toggleProductCode, (state: ProductState): ProductState => ({
    ...state,
    showProductCode: !state.showProductCode
  })),
  on(ProductActions.setCurrentProduct, (state: ProductState, action: { product: Product }): ProductState => ({
    ...state,
    currentProduct: action.product
  })),
  on(ProductActions.clearCurrentProduct, (state: ProductState): ProductState => ({
    ...state,
    currentProduct: null
  })),
  on(ProductActions.initializeCurrentProduct, (state: ProductState): ProductState => ({
    ...state,
    currentProduct: {
      id: 0,
      productName: '',
      productCode: 'New',
      description: '',
      starRating: 0
    }
  }))
);
