# Mock Service Worker — backend zaślepka (radar)

Mockowany backend dla zadania "Lista wykrytych obiektów". Przechwytuje żądania
axiosa/fetch w przeglądarce. Uczestnicy budują na tym własne kontrakty (DTO + zod),
serwisy, hooki react-query, slice'y redux i UI.

## Włączanie / wyłączanie

Sterowane zmienną w `.env.local`:

```
VITE_ENABLE_MOCKS="true"   # "true" = mock włączony
```

Worker startuje w `src/main.tsx` przed renderem (`enableMocking()`).

## Endpointy

Bazowy URL: `/api` (ten sam origin — ustaw w axiosie `baseURL: "/api"`).
Każda odpowiedź ma ~300 ms sztucznego opóźnienia (loading state).

### `GET /api/objects`

Lista wykrytych obiektów. **Przy każdym wywołaniu obiekty się przemieszczają**
(pod polling / `refetchInterval`). Sporadycznie pojawia się nowy obiekt lub
istniejący jest tracony; obiekt w strefie bliskiej eskaluje do zagrożenia `high`.

Query (opcjonalne, filtrowanie):

- `type` — `aircraft` | `drone` | `missile` | `unknown`
- `threatLevel` — `low` | `medium` | `high`

Przykład: `GET /api/objects?type=drone&threatLevel=high`

Zwraca `200` z tablicą (bez historii):

```json
[
  {
    "id": "OBJ-0001",
    "type": "drone",
    "azimuth": 143,
    "distance": 87,
    "speed": 420,
    "altitude": 3100,
    "threatLevel": "medium",
    "status": "active",
    "updatedAt": "2026-07-02T10:00:00.000Z",
    "note": null
  }
]
```

### `GET /api/objects/:id`

Szczegóły obiektu **z historią zmian statusu** (`history: []`).
`404` gdy nie znaleziono.

### `PATCH /api/objects/:id`

Ręczna klasyfikacja obiektu przez operatora. Body (wszystkie pola opcjonalne):

```json
{ "type": "aircraft", "threatLevel": "high", "status": "classified", "note": "..." }
```

- Domyślnie ustawia `status: "classified"` i dopisuje wpis do historii.
- **Walidacja serwerowa**: gdy `threatLevel === "high"` bez `note` → `422`
  `{ "message": "...", "field": "note" }` (walidację warunkową i tak zrób w zod).
- `404` gdy nie znaleziono.

## Pola obiektu

| pole          | typ                                             | uwagi                    |
| ------------- | ----------------------------------------------- | ------------------------ |
| `id`          | string                                          | np. `OBJ-0001`           |
| `type`        | `aircraft \| drone \| missile \| unknown`       |                          |
| `azimuth`     | number                                          | 0–360 stopni             |
| `distance`    | number                                          | km, > 0                  |
| `speed`       | number                                          | km/h                     |
| `altitude`    | number                                          | m                        |
| `threatLevel` | `low \| medium \| high`                         |                          |
| `status`      | `active \| classified \| lost \| neutralized`   |                          |
| `updatedAt`   | string (ISO)                                     |                          |
| `note`        | string?                                          |                          |
| `history`     | `{ status, threatLevel, changedAt, note? }[]`   | tylko w GET szczegółów   |

## Pliki

- `browser.ts` — instancja workera
- `handlers.ts` — definicje endpointów (edytuj, by dodać/zmienić trasy)
- `db.ts` — stan in-memory + `advance()` (symulacja ruchu)
- `types.ts` — typy wewnętrzne mocka
- `index.ts` — `enableMocking()`
