const BASE_URL = 'http://localhost:8080';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

function putAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export {
  fetchWithAuth,
  putAccessToken,
  getAccessToken,
  BASE_URL,
}