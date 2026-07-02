import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./AuthContext";

describe("useAuth hook", () => {
  it("should toggle values", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);

    act(() => {
      result.current.toggleLoggedIn();
    });

    expect(result.current.isLoggedIn).toBe(true);
  });
});
