import { BASE_URL, fetchWithAuth } from "../utils/api";

export async function getProfileServiceById(userId: number) {
  const result = await fetchWithAuth(`${BASE_URL}/user/get-profile/${userId}`);
  let error = false;
  const { message, user } = await result.json();
  if (result.status !== 200) error = true;
  return {message, user, error};
}
