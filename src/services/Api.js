const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export async function getLocations() {
  const res = await fetch(`${API_URL}/locations/`);
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
}

export async function getLocationbyId(id) {
    const res = await fetch(`${API_URL}/locations/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationProperties(id) {
    const res = await fetch(`${API_URL}/locations/${id}/properties/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationDetails(id) {
    const res = await fetch(`${API_URL}/locations/${id}/details/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationByName(name) {
    const res = await fetch(`${API_URL}/locations/search/?q=${name}`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getProperties() {
    const res = await fetch(`${API_URL}/properties/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getPropertyId(id) {
    const res = await fetch(`${API_URL}/properties/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_URL}/users/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsersId(id) {
    const res = await fetch(`${API_URL}/users/${id}/`);
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}