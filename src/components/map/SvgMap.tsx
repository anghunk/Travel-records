import { useEffect } from 'react';
import type { City } from '@/types';
import { MapContainer, Marker, TileLayer, Tooltip as LeafletTooltip, useMap } from 'react-leaflet';
import { divIcon, type DivIcon, latLngBounds } from 'leaflet';

type MapStyle = 'osm' | 'carto-light' | 'esri-satellite';

interface SvgMapProps {
  cities: City[];
  onCityClick: (city: City) => void;
  mapStyle: MapStyle;
}

const tileLayerConfigs: Record<
  MapStyle,
  {
    url: string;
    attribution: string;
  }
> = {
  'osm': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  'carto-light': {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; OpenStreetMap contributors &copy; CARTO',
  },
  'esri-satellite': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};

const redFlagIcon: DivIcon = divIcon({
  className: '',
  iconSize: [20, 28],
  iconAnchor: [10, 28],
  html: `
    <div style="position: relative; width: 20px; height: 28px;">
      <div style="
        position: absolute;
        left: 8px;
        top: 4px;
        width: 10px;
        height: 9px;
        background: #ef4444;
        border-radius: 3px 3px 3px 0;
      "></div>
      <div style="
        position: absolute;
        left: 7px;
        top: 4px;
        width: 2px;
        height: 18px;
        background: #b91c1c;
      "></div>
    </div>
  `,
});

const FitToCities = ({ cities }: { cities: City[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!cities.length) return;

    const bounds = cities.reduce(
      (acc, city) => acc.extend([city.lat, city.lng]),
      latLngBounds([cities[0].lat, cities[0].lng], [cities[0].lat, cities[0].lng]),
    );

    map.fitBounds(bounds, { padding: [50, 50] });

    const currentZoom = map.getZoom();
    const clampedZoom = Math.max(Math.min(currentZoom, 7), 3);
    if (clampedZoom !== currentZoom) {
      map.setZoom(clampedZoom);
    }
  }, [cities, map]);

  return null;
};

export const SvgMap = ({ cities, onCityClick, mapStyle }: SvgMapProps) => {
  const tileLayer = tileLayerConfigs[mapStyle];

  return (
    <MapContainer
      center={[35, 105]}
      zoom={4}
      minZoom={3}
      maxZoom={18}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <FitToCities cities={cities} />
      <TileLayer
        url={tileLayer.url}
        attribution={tileLayer.attribution}
      />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={redFlagIcon}
          eventHandlers={{
            click: () => onCityClick(city),
          }}
        >
          <LeafletTooltip>{city.name}</LeafletTooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};
