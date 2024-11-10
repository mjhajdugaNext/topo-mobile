import { makeAuthorizedRequest, httpApiRequest } from "../../utils/http";

export function getUser() {
  return makeAuthorizedRequest({
    url: "/auth/user",
  });
}

export function login(data) {
  return httpApiRequest({
    method: "post",
    url: "/auth/login",
    data,
  });
}

export function requestForgotPassword(data) {
  return httpApiRequest({
    method: "post",
    url: "/auth/forgot-password",
    data,
  });
}

export function refreshToken(options) {
  return httpApiRequest({
    method: "post",
    url: "/auth/refresh-token",
    options,
  });
}

