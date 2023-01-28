import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function isUserAuthed() {
  const result = await fetchWithAuth(`${BASE_URL}/user/check-auth`);
  const { message } = await result.json();
  return message === 'success';
}
