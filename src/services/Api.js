const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function getLocations() {
  const res = await fetch(`${API_URL}/locations/`);
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
}

export async function getLocationbyId() {
    const res = await fetch(`${API_URL}/locations/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationProperties() {
    const res = await fetch(`${API_URL}/locations/${id}/properties/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationSubLocations() {
    const res = await fetch(`${API_URL}/locations/${id}/sub_locations/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getProperties() {
    const res = await fetch(`${API_URL}/properties/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getPropertyId() {
    const res = await fetch(`${API_URL}/properties/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_URL}/users/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsersId() {
    const res = await fetch(`${API_URL}/users/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}