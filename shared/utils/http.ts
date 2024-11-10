import axios from 'axios'
import { call, select, put, take } from 'redux-saga/effects'
import { API_URL, TOKEN_REFRESH_TRESHOLD } from '../../config/config'
import { sharedActionTypes, sharedActions, sharedSelectors } from './store.utils'
import { extractAccessTokenData } from '../modules/auth/auth.utils'

const UNAUTHENTICATED = 'Unauthenticated'

const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export function httpApiRequest(config) {
  return apiInstance(config)
}

export function* makeAuthorizedRequest(config) {
  let response
  try {
    const isRefreshingToken = yield select(sharedSelectors.isRefreshingToken)
    const user = yield select(sharedSelectors.selectedUser)
    const now = new Date().getTime()

    if (isRefreshingToken) {
      console.log('isRefreshingToken', isRefreshingToken)
      const action = yield take([sharedActionTypes.setIsRefreshingToken, sharedActionTypes.refreshTokenFailure])
      console.log('after take')
      if (action.type === sharedActionTypes.refreshTokenFailure) throw new Error(UNAUTHENTICATED)
    }

    let accessTokenData = yield select(sharedSelectors.token)

    if (!isRefreshingToken && accessTokenData && accessTokenData.expiresDate - now < TOKEN_REFRESH_TRESHOLD) {
      yield put(sharedActions.startRefreshingToken())

      const action = yield take([sharedActionTypes.setAuthData, sharedActionTypes.refreshTokenFailure])
      if (action.type === sharedActionTypes.refreshTokenFailure) throw new Error(UNAUTHENTICATED)

      if (action.type === sharedActionTypes.setAuthData) {
        accessTokenData = extractAccessTokenData(action.payload.token)
      }
    }

    if (!accessTokenData) throw new Error(UNAUTHENTICATED)

    const headers = {
      ...(config.headers ? { ...config.headers } : {}),
      Authorization: accessTokenData.accessToken,
    }

    if (user) {
      headers['x-user-id'] = user.uuid
    }

    const _response = yield call(httpApiRequest, {
      withCredentials: true,
      ...config,
      headers,
    })

    response = _response
  } catch (e) {
    console.log('makeAuthorizedRequest: request url', config.url)
    console.log('makeAuthorizedRequest: request error:', e)
    if (e?.response?.status === 401 || e.message === UNAUTHENTICATED) {
      yield put(sharedActions.logout())
    }
    throw e
  }

  return response
}
