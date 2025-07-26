const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export async function getLocations() {
  const res = await fetch(`${API_URL}/locations/`,{
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
}

export async function getLocationbyId(id) {
    const res = await fetch(`${API_URL}/locations/${id}/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationProperties(id) {
    const res = await fetch(`${API_URL}/locations/${id}/properties/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationDetails(id) {
    const res = await fetch(`${API_URL}/locations/${id}/details/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationByName(name) {
    const res = await fetch(`${API_URL}/locations/search/?q=${name}`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getProperties() {
    const res = await fetch(`${API_URL}/properties/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getPropertyId(id) {
    const res = await fetch(`${API_URL}/properties/${id}/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_URL}/users/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getUsersId(id) {
    const res = await fetch(`${API_URL}/users/${id}/`,{
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados');
    return res.json();
}

export async function getLocationEducationalInstitutions(id) {
    const res = await fetch(`${API_URL}/locations/${id}/schools/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados de educação');
    return res.json();
}

export async function getLocationLeisure(id) {
    const res = await fetch(`${API_URL}/locations/${id}/leisure/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados de lazer');
    return res.json();
}

export async function getLocationMobility(id) {
    const res = await fetch(`${API_URL}/locations/${id}/mobility/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados de mobilidade');
    return res.json();
}

export async function getLocationCommerce(id) {
    const res = await fetch(`${API_URL}/locations/${id}/commerce/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados de comércio');
    return res.json();
}

export async function getLocationHealth(id) {
    const res = await fetch(`${API_URL}/locations/${id}/health/`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao buscar dados de saúde');
    return res.json();
}


export async function toggleFavoriteLocation(userId, locationId) {
    const res = await fetch(`${API_URL}/users/${userId}/toggle-favorite/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ location_id: locationId })
    });
    if (!res.ok) throw new Error('Erro ao favoritar/desfavoritar localização');
    return res.json();
}
export async function registerUser(username, email, password, role) {
    try {
        const res = await fetch(`${API_URL}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role })
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            console.error('Registration error:', errorData);
            throw new Error(errorData.detail || 'Erro ao registrar usuário');
        }
        
        return res.json();
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export async function loginUser(username, password) {
    const res = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
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