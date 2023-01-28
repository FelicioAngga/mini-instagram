import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function deletePostService(postId: string) {
  const result = await fetchWithAuth(`${BASE_URL}/post/delete/${postId}`, {
    method: 'DELETE'});
  let error = false;
  const { message } = await result.json();
  if (result.status !== 200) error = true;
  return {message, error};
}