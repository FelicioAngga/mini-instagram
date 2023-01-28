import { BASE_URL } from "../utils/api";

export async function signupService({ username, password}: SignupServiceType) {
  const result = await fetch(`${BASE_URL}/user/signup`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      username,
      password
  })});
  let error = false;
  const { message } = await result.json();
  if (result.status === 400) error = true;
  return {message, error};
}

export type SignupServiceType = {
  username: string,
  password: string,
}