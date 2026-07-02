import { render, screen, fireEvent } from "@testing-library/react";
import { Stepper } from "./Stepper";

describe("Stepper component", () => {
  it("should display default state", () => {
    render(<Stepper />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should display decrease state", () => {
    render(<Stepper />);

    const button = screen.getByRole("button", { name: "-" });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText("-2")).toBeInTheDocument();
  });

  it("should display increase state", () => {
    render(<Stepper />);

    const button = screen.getByRole("button", { name: "+" });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it.skip("should display changed state", () => {
    render(<Stepper />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "432" } });
    fireEvent.keyDown(input, { event: { key: "Enter" } });

    expect(screen.getByText("432")).toBeInTheDocument();
  });
});
