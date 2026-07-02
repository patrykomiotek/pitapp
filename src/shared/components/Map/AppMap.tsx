import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
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
import { Text } from "@/ui";
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

// Fetcher dla react-query — rzuca błędem, żeby useQuery wykrył stan error.
const fetchObjects = async (): Promise<DetectedObject[]> => {
  const response = await fetch("/api/objects");
  if (!response.ok) throw new Error("Nie udało się pobrać obiektów");
  return response.json();
};

export const AppMap = () => {
  const {
    data: objects = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["objects"],
    queryFn: fetchObjects,
    refetchInterval: 3000, // polling co 3s — symulacja czasu rzeczywistego
  });

  const renderIcon = (type: string, threatLevel: string) => {
    const Icon = ICONS[type] ?? HelpCircle;

    return <Icon color={THREAT_COLOR[threatLevel] ?? "#334155"} size={28} />;
  };

  return (
    <div>
      {isPending && <p className="p-2">Ładowanie danych…</p>}
      {isError && <p className="p-2 text-red-600">Błąd pobierania obiektów</p>}

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

      <table className="p-2">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Type</th>
            <th>Azimuth</th>
            <th>Distance</th>
            <th>Speed</th>
            <th>Altitude</th>
            <th>Threat Level</th>
            <th>Status</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj) => (
            <tr key={obj.id}>
              <td className="p-2">{renderIcon(obj.type, obj.threatLevel)}</td>
              <td className="p-2">
                <Text>{obj.id}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.type}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.azimuth}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.distance}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.speed}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.altitude}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.threatLevel}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.status}</Text>
              </td>
              <td className="p-2">
                <Text>{obj.updatedAt}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
