export function extractRefreshTokenData(refreshTokenCookie: any) {
  if (!refreshTokenCookie) return null;

  const cookies = refreshTokenCookie.split(";");
  const refreshTokenData = cookies[0];
  const expiresInData = cookies[2];

  const refreshToken = refreshTokenData.split("=")[1];
  const expiresIn = expiresInData.split("=")[1];

  const now = new Date();
  const expiresDate = now.getTime() + parseInt(expiresIn) * 1_000;

  return { refreshToken, expiresDate };
}

export function extractAccessTokenData(accessTokenData: any) {
  if (!accessTokenData) return null;

  const now = new Date();
  const expiresDate = now.getTime() + accessTokenData.expires_in * 1_000;
  const accessToken = `${accessTokenData.token_type} ${accessTokenData.access_token}`;

  return { accessToken, expiresDate };
}
