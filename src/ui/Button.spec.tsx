import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("Button component", () => {
  it("worst test ever", () => {
    const { debug } = render(<Button>Click me</Button>);
    debug();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<Button>Click me</Button>);

    expect(container).toMatchSnapshot();
  });

  it("should pass accessibility check", async () => {
    const { container } = render(<Button>Click me</Button>);

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
