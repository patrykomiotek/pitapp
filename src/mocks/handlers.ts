import { http, HttpResponse, delay } from "msw";
import { advance, getAll, getById, update } from "./db";
import type { ObjectStatus, ObjectType, ThreatLevel } from "./types";
import type { ProductDto } from "@/features/products/contracts/Product.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Symulowane opóźnienie sieci (ms).
const LATENCY = 300;

export const handlers = [
  // GET /api/objects?type=&threatLevel=
  // Lista wykrytych obiektów. Przy każdym pobraniu obiekty się przemieszczają
  // (symulacja czasu rzeczywistego pod refetchInterval / polling).

  // axios.get('/api/objects').then()
  http.get("/api/objects", async ({ request }) => {
    await delay(LATENCY);
    advance();

    const url = new URL(request.url);
    const type = url.searchParams.get("type") as ObjectType | null;
    const threatLevel = url.searchParams.get(
      "threatLevel",
    ) as ThreatLevel | null;

    // Lista bez historii — historia tylko w widoku szczegółów.
    let data = getAll().map((o) => ({
      id: o.id,
      type: o.type,
      azimuth: o.azimuth,
      distance: o.distance,
      speed: o.speed,
      altitude: o.altitude,
      threatLevel: o.threatLevel,
      status: o.status,
      updatedAt: o.updatedAt,
      note: o.note,
    }));
    if (type) data = data.filter((o) => o.type === type);
    if (threatLevel) data = data.filter((o) => o.threatLevel === threatLevel);

    return HttpResponse.json(data);
  }),

  // GET /api/objects/:id
  // Szczegóły obiektu wraz z historią zmian statusu.
  http.get("/api/objects/:id", async ({ params }) => {
    await delay(LATENCY);
    const obj = getById(params.id as string);
    if (!obj) {
      return HttpResponse.json(
        { message: "Nie znaleziono obiektu" },
        { status: 404 },
      );
    }
    return HttpResponse.json(obj);
  }),

  // PATCH /api/objects/:id
  // Ręczna klasyfikacja obiektu przez operatora.
  // Body: { type?, threatLevel?, status?, note?, azimuth?, distance? }
  // Walidacja serwerowa: notatka wymagana przy zagrożeniu wysokim (422).
  http.patch("/api/objects/:id", async ({ params, request }) => {
    await delay(LATENCY);

    const body = (await request.json().catch(() => ({}))) as {
      type?: ObjectType;
      threatLevel?: ThreatLevel;
      status?: ObjectStatus;
      note?: string;
      azimuth?: number;
      distance?: number;
    };

    if (body.threatLevel === "high" && !body.note?.trim()) {
      return HttpResponse.json(
        {
          message: "Notatka jest wymagana przy zagrożeniu wysokim",
          field: "note",
        },
        { status: 422 },
      );
    }

    const updated = update(params.id as string, {
      ...body,
      // Domyślnie ręczna klasyfikacja ustawia status "classified".
      status: body.status ?? "classified",
    });

    if (!updated) {
      return HttpResponse.json(
        { message: "Nie znaleziono obiektu" },
        { status: 404 },
      );
    }
    return HttpResponse.json(updated);
  }),

  http.get(`${API_BASE_URL}/products`, async () => {
    const mockedProducts: ProductDto[] = [
      {
        id: "123",
        fields: {
          name: "prod 1",
          description: "lorem ipsum",
          price: 123,
          created_at: "",
          updated_at: "",
        },
      },
      {
        id: "321",
        fields: {
          name: "prod 2",
          description: "lorem ipsum 2",
          price: 23,
          created_at: "",
          updated_at: "",
        },
      },
    ];

    return HttpResponse.json({
      records: mockedProducts,
    });
  }),
];
