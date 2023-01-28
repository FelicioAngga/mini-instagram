import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function changePasswordService(password: string) {
  const result = await fetchWithAuth(`${BASE_URL}/user/change-pass`, {
    headers: {'Content-Type': 'application/json'},
    method: 'PUT',
    body: JSON.stringify({ password })});
  let error = false;
  const { message } = await result.json();
  if (result.status !== 200) error = true;
  return {message, error};
}