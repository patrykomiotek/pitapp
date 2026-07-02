// Typy używane WEWNĘTRZNIE przez mock (MSW).
// Uczestnicy definiują własne kontrakty/DTO + schematy zod po stronie aplikacji.

export type ObjectType = "aircraft" | "drone" | "missile" | "unknown";
export type ThreatLevel = "low" | "medium" | "high";
export type ObjectStatus = "active" | "classified" | "lost" | "neutralized";

export interface StatusHistoryEntry {
  status: ObjectStatus;
  threatLevel: ThreatLevel;
  changedAt: string; // ISO
  note?: string;
}

export interface DetectedObject {
  id: string;
  type: ObjectType;
  azimuth: number; // 0–360 stopni
  distance: number; // km, > 0
  speed: number; // km/h
  altitude: number; // m
  threatLevel: ThreatLevel;
  status: ObjectStatus;
  updatedAt: string; // ISO
  note?: string;
  history: StatusHistoryEntry[];
}
