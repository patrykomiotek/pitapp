import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { AuthInfo } from "./AuthInfo";
import { AuthCredentials } from "./AuthCredentials";

describe("AuthCredentials component", () => {
  it("should toggle values", () => {
    const { debug } = render(
      <AuthProvider>
        <AuthCredentials />
      </AuthProvider>,
    );
    debug();
    const button = screen.getByRole("button");

    // const textElement = screen.getByRole("paragraph");
    // expect(textElement).toHaveTextContent("User is logged in: NO");

    const textElement = screen.getByRole("paragraph"); // p.Element
    expect(textElement).toHaveTextContent("User is logged in: NO");

    // screen.getByText(/user is logged in: NO/i);

    fireEvent.click(button);

    // textElement = screen.getByRole("paragraph");

    expect(textElement).toHaveTextContent("User is logged in: YES");

    // screen.getByText(/user is logged in: yes/i);
  });
});
