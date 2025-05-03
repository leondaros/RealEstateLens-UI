import wellknown from "wellknown";

// Parse WKT Polygon/MultiPolygon to lat/lng arrays for react-leaflet
export function getLatLngsFromGeometry(geometry) {
  if (!geometry) return [];
  const parsed = wellknown.parse(geometry);
  if (!parsed || !parsed.type) return [];
  if (parsed.type === "Polygon" && Array.isArray(parsed.coordinates)) {
    // Return a single array of latlngs for Polygon (outer ring + holes)
    return parsed.coordinates.map(ring =>
      Array.isArray(ring)
        ? ring
            .filter(coord => Array.isArray(coord) && coord.length === 2)
            .map(([lng, lat]) => [lat, lng])
        : []
    );
  } else if (parsed.type === "MultiPolygon" && Array.isArray(parsed.coordinates)) {
    // Return an array of polygons (each polygon is an array of rings)
    return parsed.coordinates.map(poly =>
      Array.isArray(poly)
        ? poly.map(ring =>
            Array.isArray(ring)
              ? ring
                  .filter(coord => Array.isArray(coord) && coord.length === 2)
                  .map(([lng, lat]) => [lat, lng])
              : []
          )
        : []
    );
  }
  return [];
}
