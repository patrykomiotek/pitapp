import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  Plane,
  Rocket,
  Radio,
  Radar,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { projectFromRadar, type LatLng } from "./mapHelpers";
import type { DetectedObject } from "../../../mocks/types";

// Pozycja stacji radaru — punkt odniesienia dla azymutu i odległości.
const RADAR: LatLng = [51.505, -0.09];

// mapowanie typu obiektu -> ikona lucide
const ICONS: Record<string, LucideIcon> = {
  aircraft: Plane,
  drone: Radio, // lucide nie ma "drona" — podstaw dowolną (Radio/Send/Bug)
  missile: Rocket,
  unknown: HelpCircle,
};

// kolor wg poziomu zagrożenia
const THREAT_COLOR: Record<string, string> = {
  low: "#16a34a",
  medium: "#f59e0b",
  high: "#dc2626",
};

function makeIcon(type: string, threatLevel: string): L.DivIcon {
  const Icon = ICONS[type] ?? HelpCircle;
  return L.divIcon({
    html: renderToStaticMarkup(
      <Icon color={THREAT_COLOR[threatLevel] ?? "#334155"} size={28} />,
    ),
    className: "", // usuwa domyślne białe tło .leaflet-div-icon
    iconSize: [28, 28],
    iconAnchor: [14, 14], // środek ikony na współrzędnych
  });
}

const radarIcon = L.divIcon({
  html: renderToStaticMarkup(<Radar color="#0ea5e9" size={32} />),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export const AppMap = () => {
  const [objects, setObjects] = useState<DetectedObject[]>([]);

  useEffect(() => {
    fetch("/api/objects")
      .then((response) => response.json())
      .then((data: DetectedObject[]) => setObjects(data ?? []))
      .catch(() => setObjects([]));
  }, []);

  return (
    <div>
      <MapContainer center={RADAR} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {objects.map((obj) => (
          <Marker
            key={obj.id}
            position={projectFromRadar(RADAR, obj.azimuth, obj.distance)}
            icon={makeIcon(obj.type, obj.threatLevel)}
          >
            <Popup>
              {obj.id} — {obj.type} ({obj.distance} km, {obj.azimuth}°)
            </Popup>
          </Marker>
        ))}

        <Marker position={RADAR} icon={radarIcon}>
          <Popup>Stacja radaru</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
