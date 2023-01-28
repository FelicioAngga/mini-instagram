import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function addPostService(formData: FormData) {
  const result = await fetchWithAuth(`${BASE_URL}/post/create`, {
    method: 'POST',
    body: formData});
  let error = false;
  const { message } = await result.json();
  if (result.status !== 200) error = true;
  return {message, error};
}