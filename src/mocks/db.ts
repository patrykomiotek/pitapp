// In-memory "baza" mocka. Trzyma stan między requestami w obrębie sesji przeglądarki.
// advance() symuluje ruch obiektów w czasie rzeczywistym (wywoływane przy pollingu listy).

import type { DetectedObject, ObjectType, ThreatLevel } from "./types";

const TYPES: ObjectType[] = ["aircraft", "drone", "missile", "unknown"];
const THREATS: ThreatLevel[] = ["low", "medium", "high"];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randInt = (min: number, max: number) => Math.round(rand(min, max));
const pick = <T>(arr: T[]) => arr[randInt(0, arr.length - 1)];
const now = () => new Date().toISOString();

let seq = 1;
const nextId = () => `OBJ-${String(seq++).padStart(4, "0")}`;

function seedObject(): DetectedObject {
  const type = pick(TYPES);
  const threatLevel: ThreatLevel =
    type === "missile" ? "high" : type === "unknown" ? pick(THREATS) : "low";

  return {
    id: nextId(),
    type,
    azimuth: randInt(0, 360),
    distance: Math.round(rand(5, 400)),
    speed: randInt(120, 2500),
    altitude: randInt(50, 12000),
    threatLevel,
    status: "active",
    updatedAt: now(),
    history: [
      {
        status: "active",
        threatLevel,
        changedAt: now(),
        note: "Obiekt wykryty",
      },
    ],
  };
}

// Startowy zestaw obiektów.
const objects: DetectedObject[] = Array.from({ length: 8 }, seedObject);

/** Zwraca kopię wszystkich obiektów. */
export const getAll = (): DetectedObject[] => objects.map((o) => ({ ...o }));

/** Zwraca pojedynczy obiekt (z historią) lub undefined. */
export const getById = (id: string): DetectedObject | undefined => {
  const found = objects.find((o) => o.id === id);
  return found ? { ...found, history: [...found.history] } : undefined;
};

/** Aktualizuje pola obiektu i dopisuje wpis do historii. Zwraca zaktualizowany obiekt. */
export const update = (
  id: string,
  patch: Partial<Pick<DetectedObject, "type" | "threatLevel" | "status" | "note">>,
): DetectedObject | undefined => {
  const obj = objects.find((o) => o.id === id);
  if (!obj) return undefined;

  Object.assign(obj, patch);
  obj.updatedAt = now();
  obj.history.push({
    status: obj.status,
    threatLevel: obj.threatLevel,
    changedAt: obj.updatedAt,
    note: patch.note,
  });
  return { ...obj, history: [...obj.history] };
};

/**
 * Symulacja upływu czasu — obiekty się przemieszczają.
 * Wywoływana przy każdym pobraniu listy, żeby polling widział zmiany.
 */
export function advance(): void {
  for (const obj of objects) {
    if (obj.status === "lost" || obj.status === "neutralized") continue;

    // Zbliżanie się / oddalanie oraz dryf azymutu i wysokości.
    obj.azimuth = (obj.azimuth + rand(-8, 8) + 360) % 360;
    obj.distance = Math.max(1, Math.round(obj.distance + rand(-15, 8)));
    obj.altitude = Math.max(0, Math.round(obj.altitude + rand(-200, 200)));
    obj.speed = Math.max(50, Math.round(obj.speed + rand(-40, 40)));
    obj.updatedAt = now();

    // Bliski, szybki obiekt eskaluje zagrożenie.
    if (obj.distance < 40 && obj.threatLevel !== "high" && obj.status === "active") {
      obj.threatLevel = "high";
      obj.history.push({
        status: obj.status,
        threatLevel: "high",
        changedAt: obj.updatedAt,
        note: "Automatyczna eskalacja (obiekt w strefie bliskiej)",
      });
    }

    // Sporadycznie obiekt znika z radaru.
    if (Math.random() < 0.02) {
      obj.status = "lost";
      obj.history.push({
        status: "lost",
        threatLevel: obj.threatLevel,
        changedAt: obj.updatedAt,
        note: "Utracono kontakt",
      });
    }
  }

  // Sporadycznie pojawia się nowy obiekt (max ~15 na ekranie).
  if (objects.length < 15 && Math.random() < 0.25) {
    objects.push(seedObject());
  }
}
