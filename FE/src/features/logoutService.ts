import { BASE_URL, fetchWithAuth, putAccessToken } from "../utils/api";

export async function logoutService() {
  const result = await fetchWithAuth(`${BASE_URL}/user/logout`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST'});
  let error = false;
  const { message } = await result.json();
  putAccessToken('');
  if (result.status === 400) error = true;
  return {message, error};
}