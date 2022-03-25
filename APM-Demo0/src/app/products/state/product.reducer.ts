import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';

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

export const productReducer = createReducer(
  initialState,
  on(ProductPageActions.toggleProductCode,
    (state: ProductState): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode
    })
  ),
  on(ProductPageActions.setCurrentProduct,
    (state: ProductState, action: { currentProductId: number }): ProductState => ({
      ...state,
      currentProductId: action.currentProductId
    })
  ),
  on(ProductPageActions.clearCurrentProduct,
    (state: ProductState): ProductState => ({
      ...state,
      currentProductId: null
    })
  ),
  on(ProductPageActions.initializeCurrentProduct,
    (state: ProductState): ProductState => ({
      ...state,
      currentProductId: 0
    })
  ),
  on(ProductApiActions.loadProductsSuccess,
    (state: ProductState, action: { products: Product[] }): ProductState => ({
      ...state,
      products: action.products,
      error: ''
    })
  ),
  on(ProductApiActions.loadProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      products: [],
      error: action.error
    })
  ),
  on(ProductApiActions.updateProductSuccess,
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
  on(ProductApiActions.updateProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  ),
  on(ProductApiActions.createProductSuccess,
    (state: ProductState, action: { product: Product }): ProductState => ({
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: ''
    })
  ),
  on(ProductApiActions.createProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  ),
  on(ProductApiActions.deleteProductSuccess,
    (state: ProductState, action: { productId: number }): ProductState => ({
      ...state,
      products: state.products.filter(product => product.id !== action.productId),
      currentProductId: null,
      error: ''
    })
  ),
  on(ProductApiActions.deleteProductFailure,
    (state: ProductState, action: { error: string }): ProductState => ({
      ...state,
      error: action.error
    })
  )
);
