import { all, takeLatest, put, call, select, delay } from 'redux-saga/effects'
import * as authApi from './auth.api'
import * as rootNavigation from '../../utils/rootNavigation'
import { displayErrorNotification, displayInnerNotification } from '../../utils/notification'
import { createSelector } from 'reselect'
import * as authUtils from './auth.utils'
import { ReducerPrefixes, sharedActionTypes, sharedActions, sharedSelectors } from '../../utils/store.utils'
import { TOKEN_REFRESH_TRESHOLD } from '../../../config/config'
import { MainScreens } from '../../enums/shared.interface'

const initialState = {
  isRequestingLogin: false,
  isRequestingForgotPassword: false,
  requestLoginErrorMessage: '',
  requestForgotPasswordErrorMessage: '',

  token: null,
  refreshToken: null,
  isAuthenticating: false,
  isRefreshingToken: false,

  user: null,
}

export const authSelectors: any = {
  isRequestingLogin: (state: any) => state[ReducerPrefixes.auth].isRequestingLogin,
  isRefreshingToken: (state: any) => state[ReducerPrefixes.auth].isRefreshingToken,
  isRequestingForgotPassword: (state: any) => state[ReducerPrefixes.auth].isRequestingForgotPassword,
  requestLoginErrorMessage: (state: any) => state[ReducerPrefixes.auth].requestLoginErrorMessage,
  requestForgotPasswordErrorMessage: (state: any) => state[ReducerPrefixes.auth].requestForgotPasswordErrorMessage,
  userName: () => 'Joe Doe',

  token: (state: any) => state[ReducerPrefixes.auth].token,
  refreshToken: (state: any) => state[ReducerPrefixes.auth].refreshToken,
  isAuthenticating: (state: any) => state[ReducerPrefixes.auth].isAuthenticating,
  user: (state: any) => state[ReducerPrefixes.auth].user,
}

authSelectors.isAuthenticated = createSelector(authSelectors.token, (accessToken) => {
  if (!accessToken) return false

  return true
})

export const authActionTypes = {
  requestLogin: 'requestLogin',
  requestLoginSuccess: 'requestLoginSuccess',
  requestLoginFailure: 'requestLoginFailure',
  setRequestLoginErrorMessage: 'setRequestLoginErrorMessage',

  requestForgotPassword: 'requestForgotPassword',
  requestForgotPasswordSuccess: 'requestForgotPasswordSuccess',
  requestForgotPasswordFailure: 'requestForgotPasswordFailure',

  setIsAuthenticating: 'setIsAuthenticating',

  getUser: 'getUser',
  setUser: 'setUser',

  logout: 'logout',
}

export const authActions = {
  requestLogin: (payload) => ({
    type: authActionTypes.requestLogin,
    payload,
  }),
  requestLoginSuccess: () => ({
    type: authActionTypes.requestLoginSuccess,
  }),
  requestLoginFailure: (payload) => ({
    type: authActionTypes.requestLoginFailure,
    payload,
  }),
  setRequestLoginErrorMessage: (payload) => ({
    type: authActionTypes.setRequestLoginErrorMessage,
    payload,
  }),
  requestForgotPassword: (payload) => ({
    type: authActionTypes.requestForgotPassword,
    payload,
  }),
  requestForgotPasswordSuccess: (payload) => ({
    type: authActionTypes.requestForgotPasswordSuccess,
    payload,
  }),
  requestForgotPasswordFailure: (payload) => ({
    type: authActionTypes.requestForgotPasswordFailure,
    payload,
  }),

  setIsAuthenticating: (payload) => ({
    type: authActionTypes.setIsAuthenticating,
    payload,
  }),

  getUser: (payload) => ({
    type: authActionTypes.getUser,
    payload,
  }),
  setUser: (payload) => ({
    type: authActionTypes.setUser,
    payload,
  }),
  logout: () => ({
    type: authActionTypes.logout,
  }),
}

export const authReducer = (state = initialState, action): any => {
  const { payload } = action
  switch (action.type) {
    case authActionTypes.requestLogin:
      return {
        ...state,
        isRequestingLogin: true,
      }
    case authActionTypes.requestLoginSuccess:
      return {
        ...state,
        isRequestingLogin: false,
      }
    case authActionTypes.requestLoginFailure:
      return {
        ...state,
        isRequestingLogin: false,
        requestLoginErrorMessage: payload.errorMessage,
      }

    case authActionTypes.setRequestLoginErrorMessage:
      return {
        ...state,
        requestLoginErrorMessage: payload.errorMessage,
      }
    case authActionTypes.requestForgotPassword:
      return {
        ...state,
        isRequestingForgotPassword: true,
      }
    case authActionTypes.requestForgotPasswordSuccess:
      return {
        ...state,
        isRequestingForgotPassword: false,
      }
    case authActionTypes.requestForgotPasswordFailure:
      return {
        ...state,
        isRequestingForgotPassword: false,
        requestForgotPasswordErrorMessage: payload.errorMessage,
      }

    case sharedActionTypes.setAuthData:
      return {
        ...state,
        token: authUtils.extractAccessTokenData(payload.token),
        refreshToken: authUtils.extractRefreshTokenData(payload.refreshTokenCookie),
      }
    case authActionTypes.setIsAuthenticating:
      return {
        ...state,
        isAuthenticating: payload,
      }
    case authActionTypes.setUser:
      return {
        ...state,
        user: payload,
      }
    case authActionTypes.logout:
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
      }
    case sharedActionTypes.setIsRefreshingToken:
      return {
        ...state,
        isRefreshingToken: payload,
      }
    default:
      return state
  }
}

export function* requestLoginWatcher() {
  yield takeLatest([authActionTypes.requestLogin], function* requestLogin({ payload }) {
    try {
      const response = yield call(authApi.login, payload)
      
      let refreshTokenCookie

      if (response.headers['set-cookie']) {
        refreshTokenCookie = response.headers['set-cookie'][0]
      }

      yield put(sharedActions.setAuthData({ token: response.data, refreshTokenCookie }))

      const userResponse = yield call(authApi.getUser)
      yield put(authActions.setUser(userResponse.data))

      yield put(authActions.requestLoginSuccess())

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Unknown login error'
      console.log('error', error?.response?.data)
      displayErrorNotification(error, errorMessage)
      yield put(authActions.requestLoginFailure({ errorMessage }))
    }
  })
}

export function* requestForgotPasswordWatcher() {
  yield takeLatest([authActionTypes.requestForgotPassword], function* requestForgotPassword({ payload }) {
    try {
      const response = yield call(authApi.requestForgotPassword, payload)

      yield put(authActions.requestForgotPasswordSuccess(response.data))
      displayInnerNotification({
        description: 'We will send you an email message, if an account registered under this email address is present',
        duration: 8000,
      })
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Unknown forgot password error'
      displayErrorNotification(error, errorMessage)
      yield put(authActions.requestForgotPasswordFailure({ errorMessage }))
    }
  })
}

function* refreshTokenWatcher() {
  yield takeLatest([sharedActionTypes.startRefreshingToken], function* refresh() {
    try {
      console.log('$$$$$ REFRESHING TOKEN $$$$$')
      yield put(sharedActions.setIsRefreshingToken(true))

      const refreshToken: any = yield select(sharedSelectors.refreshToken)
      const selectedUser: any = {};
      const now = new Date().getTime()

      if (!refreshToken || refreshToken.expiresDate - now < TOKEN_REFRESH_TRESHOLD) {
        throw new Error('Refresh token expires')
      }

      const response: any = yield call(authApi.refreshToken, {
        headers: {
          Cookie: `refresh_token=${refreshToken.accessToken}; user=${selectedUser.uuid}`,
        },
      })

      let refreshTokenCookie

      if (response.headers['set-cookie']) {
        refreshTokenCookie = response.headers['set-cookie'][0]
      }

      yield put(
        sharedActions.setAuthData({
          token: response.data,
          refreshTokenCookie,
        })
      )
      yield put(sharedActions.setIsRefreshingToken(false))
      console.log('$$$$$ REFRESHING TOKEN SUCCESS $$$$$')
    } catch (e) {
      yield put(sharedActions.setIsRefreshingToken(false))
      yield put(sharedActions.refreshTokenFailure())
      console.log('$$$$$ REFRESHING TOKEN FAILED $$$$$')
      console.log('refresh token error', e)
    }
  })
}

function* logoutWatcher() {
  yield takeLatest([authActionTypes.logout], function* logout() {
    yield delay(1000);
    yield rootNavigation.navigate(MainScreens.Login)
    displayInnerNotification({ description: 'You have been logged out successfully', duration: 5000 })
  })
}

export function* authSaga() {
  yield all([requestLoginWatcher(), requestForgotPasswordWatcher(), logoutWatcher(), refreshTokenWatcher()])
}
