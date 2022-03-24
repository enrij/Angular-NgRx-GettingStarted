import { ActionReducer, createAction, createReducer, on } from '@ngrx/store';

export const userReducer: ActionReducer<{ maskUsername: boolean }> = createReducer(
  {maskUsername: true},
  on(createAction('[User] Mask username'), (state): any => ({
    ...state,
    maskUsername: !state.maskUsername
  }))
);
