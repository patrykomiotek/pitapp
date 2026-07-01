import { fireEvent, render, screen } from "@testing-library/react";
import Generator from "./Generator.tsx";

describe("Generator component", () => {
  it("shoud change uid", () => {
    render(<Generator />);
    const button = screen.getByRole("button");

    const uuidElement = screen.getByText(/[a-f0-9-]{36}/gm);
    const uuidOldValue = uuidElement.textContent;

    // const paragraphs = screen.getAllByRole("paragraph");

    fireEvent.click(button);

    // uuidElement = screen.getByText(/[a-f0-9-]{36}/gm);
    const uuidNewValue = uuidElement.textContent;

    expect(uuidOldValue).not.toEqual(uuidNewValue);
  });
});
