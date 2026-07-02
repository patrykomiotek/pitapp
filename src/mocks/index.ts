// Włącza Mock Service Worker. Wywoływane w main.tsx przed renderem.
// Sterowane zmienną VITE_ENABLE_MOCKS ("true" włącza mock).

export async function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_ENABLE_MOCKS !== "true") return;

  const { worker } = await import("./browser");
  await worker.start({
    // Nieobsłużone żądania przechodzą do sieci bez ostrzeżeń.
    onUnhandledRequest: "bypass",
  });

  console.info("[MSW] Mock Service Worker uruchomiony");
}
