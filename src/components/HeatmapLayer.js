import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet.heat";

const HeatmapLayer = ({ points, options }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !window.L || !points.length) return;

    // Remove previous heat layer if exists
    if (map._heatLayer) {
      map.removeLayer(map._heatLayer);
      map._heatLayer = null;
    }

    // Create new heat layer
    const heat = window.L.heatLayer(points, options).addTo(map);
    map._heatLayer = heat;

    return () => {
      if (map._heatLayer) {
        map.removeLayer(map._heatLayer);
        map._heatLayer = null;
      }
    };
  }, [map, points, options]);

  return null;
};

export default HeatmapLayer;