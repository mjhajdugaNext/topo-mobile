// import { createAction, handleActions } from 'redux-actions';
import { all, takeLatest } from "redux-saga/effects";

export const appReducerPrefix = "App";

const initialState = {
  isAuthenticated: false,
};

export const appSelectors = {
  isAuthenticated: (state: any) => state[appReducerPrefix].isAuthenticated,
};

export const actionTypes = {
  setIsAuthenticated: "setIsAuthenticated",
};

export const actions = {
  setIsAuthenticated: (payload: any) => ({
    type: actionTypes.setIsAuthenticated,
    payload,
  }),
};

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.setIsAuthenticated:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export function* setIsAuthenticatedWatcher() {
  yield takeLatest([actions.setIsAuthenticated], function* mainSaga() {});
}

export function* appSaga() {
  yield all([setIsAuthenticatedWatcher()]);
}
