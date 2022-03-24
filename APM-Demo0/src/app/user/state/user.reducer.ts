import { ActionReducer, createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: UserState;
}

export interface UserState {
  maskUsername: boolean;
  currentUser: string;
}

const initialState: UserState = {
  maskUsername: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUsername = createSelector(
  getUserFeatureState,
  (state: UserState) => state.maskUsername
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state: UserState) => state.currentUser
);

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask username'), (state: UserState): UserState => ({
    ...state,
    maskUsername: !state.maskUsername
  }))
);
