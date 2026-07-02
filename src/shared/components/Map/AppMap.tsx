import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { projectFromRadar } from "./mapHelpers";
import type { DetectedObject } from "../../../mocks/types";

export const AppMap = () => {
  // const { } = useMap();
  const [objects, setObjects] = useState<DetectedObject[]>([]);

  useEffect(() => {
    fetch("/api/objects")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setObjects(data as DetectedObject[]);
        }
      });
  }, []);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {objects &&
          objects.map((obj) => {
            const mapData = projectFromRadar(
              [51.505, -0.09], // start point
              obj.azimuth,
              obj.distance,
            );

            return (
              <Marker position={[mapData[0], mapData[1]]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
