import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function getAllPostService() {
  const result = await fetchWithAuth(`${BASE_URL}/post/all`);
  let error = false;
  const { message, posts } = await result.json();
  if (result.status !== 200) error = true;
  return {message, posts, error};
}
