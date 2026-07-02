import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  classifyObjectSchema,
  OBJECT_TYPES,
  THREAT_LEVELS,
  type ClassifyFormValues,
} from "./classify";
import type { DetectedObject } from "../../../mocks/types";

// Mutacja — PATCH klasyfikacji. Rzuca błędem (w tym 422 z serwera), by useMutation złapał error.
async function classifyObject(
  id: string,
  values: ClassifyFormValues,
): Promise<DetectedObject> {
  const response = await fetch(`/api/objects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message ?? "Klasyfikacja nie powiodła się");
  }
  return response.json();
}

interface Props {
  object: DetectedObject;
  onDone: () => void;
}

export const ClassifyObjectForm = ({ object, onDone }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClassifyFormValues>({
    resolver: zodResolver(classifyObjectSchema),
    defaultValues: {
      type: object.type,
      threatLevel: object.threatLevel,
      azimuth: object.azimuth,
      distance: object.distance,
      note: object.note ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: ClassifyFormValues) =>
      classifyObject(object.id, values),
    onSuccess: () => {
      // Inwalidacja listy — polling i tak odświeży, ale to wymusza natychmiastowy refetch.
      queryClient.invalidateQueries({ queryKey: ["objects"] });
      onDone();
    },
  });

  // Notatka wymagana warunkowo — podświetlamy pole gdy zagrożenie wysokie.
  const threatLevel = useWatch({ control, name: "threatLevel" });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="mt-4 flex max-w-md flex-col gap-3 border border-slate-300 p-4"
    >
      <h3 className="font-bold">Klasyfikacja obiektu {object.id}</h3>

      <label className="flex flex-col gap-1">
        <span>Typ</span>
        <select {...register("type")} className="border p-1">
          {OBJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.type && (
          <span className="text-red-600">{errors.type.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span>Poziom zagrożenia</span>
        <select {...register("threatLevel")} className="border p-1">
          {THREAT_LEVELS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.threatLevel && (
          <span className="text-red-600">{errors.threatLevel.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span>Azymut (0–360)</span>
        <input
          type="number"
          step="any"
          {...register("azimuth", { valueAsNumber: true })}
          className="border p-1"
        />
        {errors.azimuth && (
          <span className="text-red-600">{errors.azimuth.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span>Odległość (km, &gt; 0)</span>
        <input
          type="number"
          step="any"
          {...register("distance", { valueAsNumber: true })}
          className="border p-1"
        />
        {errors.distance && (
          <span className="text-red-600">{errors.distance.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span>
          Notatka
          {threatLevel === "high" && " (wymagana przy zagrożeniu wysokim)"}
        </span>
        <textarea {...register("note")} className="border p-1" rows={2} />
        {errors.note && (
          <span className="text-red-600">{errors.note.message}</span>
        )}
      </label>

      {mutation.isError && (
        <span className="text-red-600">{mutation.error.message}</span>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-sky-600 px-3 py-1 text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Zapisywanie…" : "Zapisz"}
        </button>
        <button type="button" onClick={onDone} className="border px-3 py-1">
          Anuluj
        </button>
      </div>
    </form>
  );
};
