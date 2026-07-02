import { z } from "zod";

export const OBJECT_TYPES = ["aircraft", "drone", "missile", "unknown"] as const;
export const THREAT_LEVELS = ["low", "medium", "high"] as const;

/**
 * Walidacja formularza klasyfikacji:
 * - azymut 0–360
 * - odległość > 0
 * - notatka wymagana przy zagrożeniu wysokim (walidacja warunkowa -> refine)
 */
export const classifyObjectSchema = z
  .object({
    type: z.enum(OBJECT_TYPES),
    threatLevel: z.enum(THREAT_LEVELS),
    azimuth: z
      .number({ error: "Azymut jest wymagany" })
      .min(0, { error: "Azymut musi być >= 0" })
      .max(360, { error: "Azymut musi być <= 360" }),
    distance: z
      .number({ error: "Odległość jest wymagana" })
      .positive({ error: "Odległość musi być > 0" }),
    note: z.string().optional(),
  })
  .refine((data) => data.threatLevel !== "high" || !!data.note?.trim(), {
    path: ["note"],
    error: "Notatka jest wymagana przy zagrożeniu wysokim",
  });

export type ClassifyFormValues = z.infer<typeof classifyObjectSchema>;
