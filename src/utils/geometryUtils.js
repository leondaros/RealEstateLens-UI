import wellknown from "wellknown";

// Parse WKT Polygon/MultiPolygon to lat/lng arrays for react-leaflet
export function getLatLngsFromGeometry(geometry) {
  if (!geometry) return [];
  const parsed = wellknown.parse(geometry);
  if (!parsed) return [];
  if (parsed.type === "Polygon") {
    return parsed.coordinates.map(ring => ring.map(([lng, lat]) => [lat, lng]));
  } else if (parsed.type === "MultiPolygon") {
    return parsed.coordinates.flatMap(poly =>
      poly.map(ring => ring.map(([lng, lat]) => [lat, lng]))
    );
  }
  return [];
}
