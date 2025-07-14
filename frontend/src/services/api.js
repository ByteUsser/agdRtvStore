// src/services/api.js
const BASE_URL = 'http://localhost:5001/api'; // Podstawowy URL backendu

export async function apiRequest(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.message || 'Błąd podczas komunikacji z serwerem');
  }
  return result;
}
