import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistReducer, persistStore } from "redux-persist";
import { appReducer, appSaga, appReducerPrefix } from "./app.store";
import { authReducer, authSaga } from "../shared/modules/auth/auth.store";
import { ReducerPrefixes } from "../shared/utils/store.utils";
import { storeInstance } from "../shared/utils/store.utils";

const sensitiveStorage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs",
});

const authPersistConfig = {
  key: "auth",
  storage: sensitiveStorage,
  blacklist: [
    "requestForgotPasswordErrorMessage",
    "requestLoginErrorMessage",
    "isAuthenticating",
    "isRequestingLogin",
    "isRequestingForgotPassword",
  ],
};

const usersPersistConfig = {
  key: "users",
  storage: sensitiveStorage,
  whitelist: ["selectedUser"],
};

function* rootSaga() {
  yield all([appSaga(), authSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const combinedReducers: any = combineReducers({
  [appReducerPrefix]: appReducer,
  [ReducerPrefixes.auth]: persistReducer(authPersistConfig, authReducer),
});

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

storeInstance.setInstance(store);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
