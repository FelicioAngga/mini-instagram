import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function changeProfileImageService(formData: FormData) {
  const result = await fetchWithAuth(`${BASE_URL}/user/change-image`, {
    method: 'PUT',
    body: formData});
  let error = false;
  const { message } = await result.json();
  if (result.status !== 200) error = true;
  return {message, error};
}