import { BASE_URL, putAccessToken } from "../utils/api";

export async function loginService({ username, password}: LoginServiceType) {
  const result = await fetch(`${BASE_URL}/user/login`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      username,
      password
  })});
  let error = false;
  const { message, accessToken } = await result.json();
  if (result.status === 200 && accessToken) putAccessToken(accessToken);
  if (result.status === 400) error = true;
  return {message, error};
}

export type LoginServiceType = {
  username: string,
  password: string,
}