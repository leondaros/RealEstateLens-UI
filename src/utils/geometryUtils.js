import wellknown from "wellknown";
import { useMap } from "react-leaflet";
import { useEffect } from "react";


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

export function getPolygonBounds(latlngs) {
  const allCoords = latlngs.flat(2).filter(coord => Array.isArray(coord) && coord.length === 2);
  let minLat = 90,
    minLng = 180,
    maxLat = -90,
    maxLng = -180;
  allCoords.forEach(([lat, lng]) => {
    minLat = Math.min(minLat, lat);
    minLng = Math.min(minLng, lng);
    maxLat = Math.max(maxLat, lat);
    maxLng = Math.max(maxLng, lng);
  });
  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

export function FitBounds({ bounds, options }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, options || { padding: [5, 5] });
    }
  }, [map, bounds, options]);
  return null;
}