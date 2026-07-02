// src/features/tracking/geo.ts

// Promień Ziemi w kilometrach (średni, ~6371 km).
// Ziemia jest traktowana jako kula. Potrzebny, bo azymut + odległość liczymy po powierzchni kuli, a nie po płaskiej kartce.
// We wzorze pojawia się: const delta = distanceKm / EARTH_RADIUS_KM;
const EARTH_RADIUS_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180; // stopnie → radiany
const toDeg = (r: number) => (r * 180) / Math.PI; // radiany → stopnie

// Kąty można wyrażać w dwóch jednostkach:
// - stopnie — 0°…360° (tak podane są lat, lon, azimuth)
// - radiany — 0…2π (tak liczy JavaScript: Math.sin, Math.cos, Math.atan2 przyjmują i zwracają radiany)

// Pełny obrót: 360° = 2π radianów, więc:
// - stopnie → radiany: mnożysz przez π/180
// - radiany → stopnie: mnożysz przez 180/π

// We wzorze:
// 1. Na wejściu zamieniasz stopnie na radiany (toRad), zanim wrzucisz do Math.sin/cos.
// 2. Liczysz na radianach.
// 3. Na wyjściu wynik (też w radianach) zamieniasz z powrotem na stopnie (toDeg), bo Leaflet oczekuje lat/lon w stopniach.

export type LatLng = [number, number];

/**
 * Rzutuje obiekt na mapę na podstawie:
 * - origin: pozycja radaru [lat, lon]
 * - azimuthDeg: azymut 0–360° (0 = północ, zgodnie ze wskazówkami zegara)
 * - distanceKm: odległość w km
 */
export function projectFromRadar(
  origin: LatLng,
  azimuthDeg: number,
  distanceKm: number,
): LatLng {
  const lat0 = toRad(origin[0]);
  const lon0 = toRad(origin[1]);
  const bearing = toRad(azimuthDeg);
  const delta = distanceKm / EARTH_RADIUS_KM; // odległość kątowa

  const lat = Math.asin(
    Math.sin(lat0) * Math.cos(delta) +
      Math.cos(lat0) * Math.sin(delta) * Math.cos(bearing),
  );
  const lon =
    lon0 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(delta) * Math.cos(lat0),
      Math.cos(delta) - Math.sin(lat0) * Math.sin(lat),
    );

  return [toDeg(lat), toDeg(lon)];
}
