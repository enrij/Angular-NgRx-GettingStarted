import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
  products: ProductState;
}

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

export const productReducer = createReducer(
  initialState,
  on(ProductActions.toggleProductCode,
    (state: ProductState): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode
    })
  ),
  on(ProductActions.setCurrentProduct,
    (state: ProductState, action: { currentProductId: number }): ProductState => ({
      ...state,
      currentProductId: action.currentProductId
    })
  ),
  on(ProductActions.clearCurrentProduct,
    (state: ProductState): ProductState => ({
      ...state,
      currentProductId: null
    })
  ),
  on(ProductActions.initializeCurrentProduct,
    (state: ProductState): ProductState => ({
      ...state,
      currentProductId: 0
    })
  ),
  on(ProductActions.loadProductsSuccess,
    (state: ProductState, action: { products: Product[] }): ProductState => ({
      ...state,
      products: action.products,
      error: ''
    })
  ),
  on(ProductActions.loadProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      products: [],
      error: action.error
    })
  ),
  on(ProductActions.updateProductSuccess,
    (state: ProductState, action: { product: Product }): ProductState => {
      const updatedProducts = state.products
                                   .map(item => item.id === action.product.id ? action.product : item);
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.product.id,
        error: ''
      };
    }
  ),
  on(ProductActions.updateProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  ),
  on(ProductActions.createProductSuccess,
    (state: ProductState, action: { product: Product }): ProductState => {
      return {
        ...state,
        products: [...state.products, action.product],
        currentProductId: action.product.id,
        error: ''
      };
    }
  ),
  on(ProductActions.createProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  ),
  on(ProductActions.deleteProductSuccess,
    (state: ProductState, action: { productId: number }): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    };
    }
  ),
  on(ProductActions.deleteProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  )
);
