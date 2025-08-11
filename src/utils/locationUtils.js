export const addToRecentLocations = (location) => {
  try {
    const stored = localStorage.getItem('recentLocations');
    let recent = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists
    recent = recent.filter(item => item.id !== location.id);
    
    // Add to beginning of array
    recent.unshift({
      id: location.id,
      name: location.name,
      // Add other essential properties you need
    });
    
    // Keep only last 5
    recent = recent.slice(0, 5);
    
    localStorage.setItem('recentLocations', JSON.stringify(recent));
    return recent;
  } catch (error) {
    console.warn('Failed to update recent locations:', error);
    return [];
  }
};

export const safeSetItem = (key, value) => {
  try {
    // Only store essential location data
    const sanitizedValue = Array.isArray(value) 
      ? value.map(loc => ({
          id: loc.id,
          name: loc.name,
          // Add other essential fields you need
        }))
      : value;
    
    localStorage.setItem(key, JSON.stringify(sanitizedValue));
    return true;
  } catch (e) {
    console.warn('localStorage error:', e);
    // Try to clear some space by removing old items
    try {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e2) {
      console.error('Failed to store data even after cleanup:', e2);
      return false;
    }
  }
};