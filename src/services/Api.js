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

export async function toggleFavoriteLocation(userId, locationId) {
    const res = await fetch(`${API_URL}/users/${userId}/toggle-favorite/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location_id: locationId })
    });
    if (!res.ok) throw new Error('Erro ao favoritar/desfavoritar localização');
    return res.json();
}
export async function registerUser(username, email, password, role) {
    const res = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password, role: role })
    });
    if (!res.ok) throw new Error('Erro ao registrar usuário');
    return res.json();
}

export async function loginUser(username, password) {
    const res = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    });
    if (!res.ok) throw new Error('Erro ao fazer login');
    return res.json();
}

export async function refreshToken(token) {
    const res = await fetch(`${API_URL}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: token })
    });
    if (!res.ok) throw new Error('Erro ao atualizar token');
    return res.json();
}