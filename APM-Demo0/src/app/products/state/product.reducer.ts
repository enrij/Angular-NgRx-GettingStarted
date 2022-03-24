import { ActionReducer, createAction, createReducer, on } from '@ngrx/store';

export const productReducer: ActionReducer<{ showProductCode: boolean }> = createReducer(
  {showProductCode: true},
  on(createAction('[Product] Toggle product code'), (state): any => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
);
