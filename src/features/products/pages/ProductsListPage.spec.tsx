import { render, screen, waitFor } from "@testing-library/react";
import { ProductsListPage } from "./ProductsListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../../../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const client = new QueryClient();

const WrappedComponent = () => (
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <MemoryRouter>
        <ProductsListPage />
      </MemoryRouter>
    </Provider>
  </QueryClientProvider>
);

describe("ProductsListPage", () => {
  it("should display indicator", () => {
    render(<WrappedComponent />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display Products header", async () => {
    const { debug } = render(<WrappedComponent />);

    // waitFor(async () => {
    expect(await screen.findByText("Products")).toBeInTheDocument();
    // debug();
    // });
  });
});
