import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';

export interface State extends AppState.State {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: ProductState, currentProductId: number | null): Product => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    }
    return currentProductId ? state.products.find(product => product.id === currentProductId) : null;
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.error
);

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  products: [],
  currentProductId: null,
  showProductCode: true,
  error: ''
};
